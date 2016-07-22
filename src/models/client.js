import crypto from 'crypto'
import Sequelize from 'sequelize'
import db from '../db'

const Client = db.define('Client', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  secret: {
    type: Sequelize.STRING,
    notNull: true,
    defaultValue: function() {
      return crypto.randomBytes(48).toString('hex')
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

export default Client
