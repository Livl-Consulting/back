import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'
import env from './env.js'

app.ready(() => {
  const host = env.get('HOST')
  const port = env.get('PORT')
  logger.info(`Swagger UI available at http://${host}:${port}/docs`)
})
