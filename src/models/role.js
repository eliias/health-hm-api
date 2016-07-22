import Sequelize from 'sequelize'
import db from '../db'

const Role = db.define('Role', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    isUUID: 4,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isSuperuser: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Role.hasOne(Role, {as: 'parent', foreignKey: 'id'})

export default Role
