module.exports = {
  "app": {
    "workers": 1,
    "port": 3000
  },
  "db": {
    "database": "health",
    "username": "health",
    "password": "health",
    "options": {
      "dialect": "postgres",
      "host": "localhost",
      "logging": console.log,
      "define": {
        "charset": 'utf8',
        "collate": 'utf8_general_ci'
      }
    }
  }
}
