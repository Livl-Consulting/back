import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'

app.ready(() => {
  logger.info(`Swagger UI available at http://localhost:3333/docs`)
})
