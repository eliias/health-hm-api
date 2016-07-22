import _ from 'lodash'
import crypto from 'crypto'
import netiam from 'netiam'
import Promise from 'bluebird'
import moment from 'moment'
import request from 'request'
import {plugins} from '../api'
import Client from '../models/client'
import Code from '../models/code'
import Role from '../models/role'
import Social from '../models/social'
import Token from '../models/token'
import User from '../models/user'

const accessTokenTTL = 1
const refreshTokenTTL = 30

function validateFacebookToken(userId, accessToken) {
  return new Promise((resolve, reject) => {
    const profileUri = `https://graph.facebook.com/v2.4/me?fields=id,name,email,birthday,gender&access_token=${accessToken}`
    request({
      uri: profileUri
    }, function(err, response, body) {
      if (err) {
        return reject(err)
      }

      let data
      try {
        data = JSON.parse(body)
      } catch (err) {
        return reject(err)
      }

      // Error
      if (data.error) {
        return reject(data.error)
      }

      // compare user_id
      if (data.id !== userId) {
        return reject(new Error('User and profile ID do not match. Possible hijacking attempt.'))
      }

      resolve(data)
    })
  })
}

function findOrCreateUser(profile, provider) {
  const clause = [
    {
      '$profiles.provider$': provider,
      '$profiles.providerId$': profile.id,
    }
  ]

  if (profile.email) {
    clause.push({email: profile.email})
  }

  return User
    .findAll({
      where: {$or: clause},
      include: [
        {
          model: Social,
          as: 'profiles'
        }
      ]
    })
    .then(users => {
      const userData = {
        profiles: [
          {
            provider: provider,
            providerId: profile.id
          }
        ]
      }

      if (profile.email) {
        userData.email = profile.email
      }

      if (profile.name) {
        userData.name = profile.name
      }

      if (profile.birthday) {
        userData.birthday = moment(profile.birthday, 'MM/DD/YYYY').toISOString()
      }

      if (profile.gender) {
        userData.gender = profile.gender
      }

      if (users.length === 0) {
        return Role
          .findOne({name: 'USER'})
          .then(role => User.create(Object.assign({
            roleId: role.id,
            password: crypto.randomBytes(48).toString('hex'),
          }, userData), {
            include: [
              {
                model: Social,
                as: 'profiles'
              }
            ]
          }))
      }

      const user = users.shift()
      return user
        .update(userData)
        .then(user => user.getProfiles())
        .then(profiles => _.filter(profiles, p => p.provider === provider && p.providerId === profile.id).length > 0)
        .then(hasProfile => {
          if (hasProfile) {
            return
          }

          return Social
            .create({
              provider: provider,
              providerId: profile.id,
              userId: user.id
            })
            .then(profile => user.addProfile(profile))
        })
        .then(() => user)
    })
}

export default function(router) {

  /**
   * @api {post} /oauth/token Tokens
   * @apiDescription Creates a new token pair for the requested `grant_type`.
   * The endpoint implements 4 different *grant types*, according to the OAuth 2.0
   * framework specification [RFC 6749](https://tools.ietf.org/html/rfc6749#section-3.2).
   * - Password
   * - Client Credentials
   * - Refresh Token
   * - Authorization Code
   * @apiVersion 2.0.0
   * @apiName CreateTokenPair
   * @apiGroup Authorization
   * @apiParamExample {json} Access Token w/ password
   *  {
   *    "grant_type": "password",
   *    "username": "hannes@impossiblearts.com",
   *    "password": "SUPERSECRETPASSWORD"
   *  }
   * @apiParamExample {json} Refresh Token
   *  {
   *    "grant_type": "refresh_token",
   *    "token": "abc-123"
   *  }
   */
  router.post(
    '/oauth/token',
    netiam({plugins})
      .oauth.token({
        clientModel: Client,
        codeModel: Code,
        tokenModel: Token,
        userModel: User,
        refreshTokenTTL,
        destroyTokenAfterUse: false
      })
      .json()
  )

  /**
   * @api {post} /auth/facebook Facebook
   * @apiDescription This route is an endpoint for a redirect based
   * authentication flow with the Facebook API. It expects a `user_id` and
   * valid Facebook `access_token` within the request body.
   * @apiVersion 2.0.0
   * @apiName AuthFacebook
   * @apiGroup Authorization
   */
  router.post('/auth/facebook', function(req, res) {
    const userId = req.body.user_id
    const accessToken = req.body.access_token

    if (!userId || !accessToken) {
      return res
        .status(400)
        .json(new Error('Invalid userId or accessToken'))
    }

    validateFacebookToken(userId, accessToken)
      .then(profile => findOrCreateUser(profile, 'facebook'))
      .then(user => {
        const accessToken = Token
          .create({
            type: 'access_token',
            expires_at: moment().add(accessTokenTTL, 'hours').format(),
            ownerId: user.id
          })
        const refreshToken = Token
          .create({
            type: 'refresh_token',
            expires_at: moment().add(refreshTokenTTL, 'days').format(),
            ownerId: user.id
          })

        return Promise
          .all([accessToken, refreshToken])
          .then(tokens => {
            const [accessToken, refreshToken] = tokens
            const pair = {
              access_token: accessToken.token,
              refresh_token: refreshToken.token,
              token_type: 'bearer',
              expires_in: moment(accessToken.expires_at).diff(moment(), 'seconds'),
              user_id: user.id
            }
            res.json(pair)
          })
      })
      .catch(err => res.status(500).json(err.message))
  })

}
