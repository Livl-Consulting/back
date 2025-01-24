/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
const QuotesController = () => import('../app/controllers/quotes_controller.js')
const OpportunitiesController = () => import('../app/controllers/opportunities_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')
const ProductsController = () => import('../app/controllers/products_controller.js')

router
  .group(() => {
    router.get('/', [ClientsController, 'index'])
    router.post('/', [ClientsController, 'store'])
    router.get('/search', [ClientsController, 'search'])
    router.get('/:id', [ClientsController, 'show'])
    router.delete('/:id', [ClientsController, 'destroy'])
  })
  .prefix('/api/clients')

router
  .group(() => {
    router.get('/', [OpportunitiesController, 'index'])
    router.post('/', [OpportunitiesController, 'store'])
    router.post('/quote/:id', [OpportunitiesController, 'quote'])
    router.get('/:id', [OpportunitiesController, 'show'])
    router.put('/:id', [OpportunitiesController, 'update'])
    router.delete('/:id', [OpportunitiesController, 'destroy'])
  })
  .prefix('/api/opportunities')

router
  .group(() => {
    router.get('/', [QuotesController, 'index'])
    router.post('/', [QuotesController, 'store'])
    router.get('/:id', [QuotesController, 'show'])
    router.put('/:id', [QuotesController, 'update'])
    router.delete('/:id', [QuotesController, 'destroy'])
  })
  .prefix('/api/quotes')

router
  .group(() => {
    router.get('/', [ProductsController, 'index'])
    router.post('/', [ProductsController, 'store'])
    router.get('/:id', [ProductsController, 'show'])
    router.put('/:id', [ProductsController, 'update'])
    router.delete('/:id', [ProductsController, 'destroy'])
  })
  .prefix('/api/products')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
