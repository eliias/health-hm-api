'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('Socials', {
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
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
      .then(() => queryInterface.addIndex('Socials', [
        'provider',
        'userId'
      ], {
        indexName: 'unique_provider_idx',
        indicesType: 'UNIQUE'
      }))
  },

  down: function(queryInterface) {
    return queryInterface.dropTable('Socials')
  }
}
