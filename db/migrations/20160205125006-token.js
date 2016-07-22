'use strict';

const TOKEN_TYPE_ACCESS = 'access_token'
const TOKEN_TYPE_REFRESH = 'refresh_token'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tokens', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        isUUID: 4,
        defaultValue: Sequelize.UUIDV4
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: function() {
          return crypto.randomBytes(48).toString('hex')
        }
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [TOKEN_TYPE_ACCESS, TOKEN_TYPE_REFRESH]
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate: true,
        defaultValue: Date.now
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      ownerId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    })
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('Tokens')
  }
}
