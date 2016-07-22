import crypto from 'crypto'
import moment from 'moment'
import Sequelize from 'sequelize'
import Client from './client'
import db from '../db'

const Code = db.define('Code', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: crypto.randomBytes(48).toString('hex')
  },
  expires_at: {
    type: Sequelize.DATE,
    notNull: true,
    defaultValue: function() {
      return moment()
        .add(5, 'minutes')
        .format()
    }
  }
})

Code.belongsTo(Client, {as: 'client'})

export default Code
