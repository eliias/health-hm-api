import crypto from 'crypto'
import Sequelize from 'sequelize'
import db from '../db'

const TOKEN_TYPE_ACCESS = 'access_token'
const TOKEN_TYPE_REFRESH = 'refresh_token'

const Token = db.define('Token', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    isUUID: 4,
    defaultValue: Sequelize.UUIDV4
  },
  token: {
    type: Sequelize.STRING,
    notNull: true,
    unique: true,
    defaultValue: function() {
      return crypto.randomBytes(48).toString('hex')
    }
  },
  type: {
    type: Sequelize.ENUM,
    notNull: true,
    values: [TOKEN_TYPE_ACCESS, TOKEN_TYPE_REFRESH]
  },
  expires_at: {
    type: Sequelize.DATE,
    notNull: true,
    isDate: true,
    defaultValue: Date.now
  }
})

export default Token
