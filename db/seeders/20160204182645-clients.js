'use strict';

const moment = require('moment')

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('Clients', [
      {
        id: '0bcacf7c-f8cd-479a-b92c-d1c6b0f1bd49',
        secret: '7aeacbe7a3d6a6d253b499d088045c6da9d247e30f9bd5689a51ee089e1ec81114f6b6d74f90c692c71aed7d6029e0d3',
        name: 'Health Client',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ])
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('Clients',
      {
        id: ['0bcacf7c-f8cd-479a-b92c-d1c6b0f1bd49']
      }
    )
  }
}
