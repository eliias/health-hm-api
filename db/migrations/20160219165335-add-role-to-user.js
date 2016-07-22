'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('Users', 'roleId', {
        type: Sequelize.UUID,
        allowNull: false
      })
      .then(() => queryInterface.changeColumn('Users', 'roleId', {
        type: Sequelize.UUID,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }))
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('Users', 'roleId')
  }
}
