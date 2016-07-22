import db from '../../src/db'

export function setup(done) {
  db
    .sync()
    .then(() => done())
    .catch(done)
}

export function teardown(done) {
  db
    .drop()
    .then(() => done())
    .catch(done)
}
