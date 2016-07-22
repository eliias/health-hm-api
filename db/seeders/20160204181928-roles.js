'use strict';

const moment = require('moment')

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        id: '0cad9db2-c06e-4ac0-ace1-4a2af1d884f7',
        name: 'USER',
        isSuperuser: false,
        description: 'Every user inherits from this role.',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: '9dd1d903-29a2-42d3-a95c-bc93d9774f17',
        name: 'GUEST',
        isSuperuser: false,
        description: 'If not logged in, every user is a guest.',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }, {
        id: 'e2ec3d26-8ccb-48bc-8c2e-c175b82b1d78',
        name: 'OWNER',
        isSuperuser: false,
        description: 'SPECIAL: Owner role.',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        id: 'f2b63b82-9c0e-40a5-9a0a-d6d3bd730202',
        name: 'ADMIN',
        isSuperuser: true,
        description: 'System administrators.',
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ])
  },

  down: function(queryInterface) {
    return queryInterface.bulkDelete('Roles',
      {
        id: [
          '0cad9db2-c06e-4ac0-ace1-4a2af1d884f7',
          '9dd1d903-29a2-42d3-a95c-bc93d9774f17',
          'e2ec3d26-8ccb-48bc-8c2e-c175b82b1d78',
          'f2b63b82-9c0e-40a5-9a0a-d6d3bd730202'
        ]
      }
    )
  }
}
