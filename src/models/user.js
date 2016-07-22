import _ from 'lodash'
import bcrypt from 'bcrypt-as-promised'
import Promise from 'bluebird'
import Sequelize from 'sequelize'
import db from '../db'
import Token from './token'
import Role from './role'
import Social from './social'

const User = db.define('User', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    isUUID: 4,
    defaultValue: Sequelize.UUIDV4
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    notEmpty: true
  },
  birthday: Sequelize.DATE,
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  hooks: {
    beforeCreate: user => {
      if (!user.password) {
        return
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => user.password = hash)
    },
    beforeBulkCreate: users => {
      return Promise.all(
        _.map(users, user => {
          if (!user.password) {
            return
          }

          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(user.password, salt))
            .then(hash => user.password = hash)
        })
      )
    },
    beforeUpdate: user => {
      if (!user.changed('password')) {
        return
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => user.password = hash)
    }
  }
})

Token.belongsTo(User, {as: 'owner'})
User.belongsTo(Role, {as: 'role'})
User.hasMany(Social, {
  foreignKey: 'userId',
  as: 'profiles'
})

export default User
