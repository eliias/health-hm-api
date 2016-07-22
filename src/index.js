import cluster from 'cluster'
import config from 'config'
import app from './app'

if (cluster.isMaster) {
  for (let i = 0; i < config.get('app.workers'); i += 1) {
    cluster.fork()

  }
} else {
  app.listen(config.get('app.port'))
}
