import Sequelize from 'sequelize'
import db from '../db'

const Social = db.define('Social', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    isUUID: 4,
    defaultValue: Sequelize.UUIDV4
  },
  provider: {
    type: Sequelize.STRING,
    allowNull: false
  },
  providerId: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Social
