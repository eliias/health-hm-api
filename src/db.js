import config from 'config'
import Sequelize from 'sequelize'
import cls from 'continuation-local-storage'
import uuid from 'uuid'

const namespace = cls.createNamespace(uuid.v4())
Sequelize.cls = namespace

const dbConfig = config.get('db')

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
)

export default db
