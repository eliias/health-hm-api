import _ from 'lodash'
import netiam from 'netiam'
import Role from '../models/role'
import Token from '../models/token'
import User from '../models/user'
import {plugins} from '../api'
import adapter from '../acl/adapter'

export default function(router) {

  /**
   * @api {post} /users New user
   * @apiName CreateUser
   * @apiVersion 2.0.0
   * @apiGroup Users
   */
  router.post(
    '/users',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .acl.req({
        adapter,
        resource: 'user'
      })
      .transform(req => {
        return Role
          .findOne({where: {name: 'USER'}})
          .then(role => {
            if (_.isArray(req.data)) {
              return _.forEach(req.body.data, user => user.attributes.roleId = role.id)
            }
            req.body.data.attributes.roleId = role.id
          })
      })
      .rest({model: User})
      .acl.res({adapter, resource: 'user'})
      .json()
  )

  /**
   * @api {get} /users Fetch users
   * @apiName GetUsers
   * @apiVersion 2.0.0
   * @apiGroup Users
   */
  router.get(
    '/users',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .rest({model: User})
      .acl.res({adapter, resource: 'user'})
      .json()
  )

  /**
   * @api {get} /users/:id Fetch user
   * @apiDescription Returns a user resource with attributes and relationships.
   * @apiVersion 2.0.0
   * @apiName GetUser
   * @apiGroup Users
   * @apiParam (Params) {String} id  The unique user ID
   * @apiExample {csharp} C#
   *  Uri usersUri = new Uri("https://api.health.hannesmoser.at/v1/users");
   *  HTTPRequest request = new HTTPRequest(usersUri, HTTPMethods.Get, OnRequestFinished);
   *  request.Send();
   * @apiExample {curl} CURL
   *  curl -i https://api.health.hannesmoser.at/v1/users/1
   * @apiExample {js} JavaScript
   *  fetch('https://api.health.hannesmoser.at/v1/users/1')
   *    .then((users) => {
   *      users.data.forEach(function(user) {
   *        console.log(user)
   *      })
   *    })
   *    .catch(err => throw new Error(err))
   */
  router.get(
    '/users/:id',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .rest({model: User})
      .acl.res({adapter, resource: 'user'})
      .json()
  )

  /**
   * @api {patch} /users/:id Update user
   * @apiName UpdateUser
   * @apiVersion 2.0.0
   * @apiGroup Users
   */
  router.patch(
    '/users/:id',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .acl.req({
        adapter,
        resource: 'user'
      })
      .rest({model: User})
      .acl.res({adapter, resource: 'user'})
      .json()
  )

  /**
   * @api {delete} /users/:id Delete user
   * @apiName DeleteUser
   * @apiVersion 2.0.0
   * @apiGroup Users
   */
  router.delete(
    '/users/:id',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .acl.req({
        adapter,
        resource: 'user'
      })
      .rest({model: User})
      .json()
  )

}
