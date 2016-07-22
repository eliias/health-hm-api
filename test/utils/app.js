import bodyParser from 'body-parser'
import express from 'express'
import routes from '../../src/routes'

export default function() {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.json({type: 'application/vnd.api+json'}))
  routes(app)
  return app
}
