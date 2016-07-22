import express from 'express'
import path from 'path'
import auth from './auth'
import roles from './roles'
import users from './users'

export default function(app) {

  const router = express.Router()

  router.get('/', function(req, res) {
    res.redirect('/v1/docs')
  })

  /**
   * @api {get} /ping Verify API status
   * @apiDescription You can use this endpoint to verify the API status and
   * response time.
   * @apiVersion 2.0.0
   * @apiName Ping
   * @apiGroup Utils
   */
  router.get('/ping', function(req, res) {
    res
      .status(204)
      .send()
  })

  /**
   * @api {get} /datetime Get server date and time
   * @apiDescription You can use this endpoint for date and time reference
   * @apiVersion 2.0.0
   * @apiName DateTime
   * @apiGroup Utils
   */
  router.get('/datetime', function(req, res) {
    const date = new Date()
    res
      .status(200)
      .send(date.toISOString())
  })

  auth(router)
  roles(router)
  users(router)

  router.use('/docs', express.static(path.join(__dirname, '/../docs/apidoc')))

  app.use('/v1', router)
  app.get('/', function(req, res) {
    res.redirect('/v1/docs')
  })

}
