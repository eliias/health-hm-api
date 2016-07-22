'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  down: function(queryInterface) {
    return queryInterface.removeColumn('Users', 'gender')
  }
}
