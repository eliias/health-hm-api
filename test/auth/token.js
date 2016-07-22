import request from 'supertest'
import appMock from '../utils/app'
import {
  setup,
  teardown
} from '../utils/db'
import User from '../../src/models/user'
import userFixture from '../fixtures/user'

const app = appMock()

describe('health', () => {
  describe('auth', () => {

    before(setup)
    after(teardown)

    it('should create user', done => {
      User
        .create(userFixture)
        .then(() => done())
        .catch(done)
    })

    it('should issue an access token', done => {
      request(app)
        .post('/v2/oauth/token')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          grant_type: 'password',
          username: 'hannes@impossiblearts.com',
          password: 'test'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done)
    })

  })
})
