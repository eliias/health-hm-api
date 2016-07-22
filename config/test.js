const path = require('path')

module.exports = {
  db: {
    options: {
      dialect: 'sqlite',
      storage: path.join(__dirname, '../test/db.sqlite'),
      logging: false
    }
  }
}
