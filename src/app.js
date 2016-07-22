import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import http from 'http'
import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import db from './db'
import routes from './routes'

const app = express()
const server = http.createServer(app)

app.enable('trust proxy')

app.disable('x-powered-by')
app.disable('etag')

app.use(morgan('dev'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(passport.initialize())

routes(app)

export default server
