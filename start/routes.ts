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

const SalesModulesController = () => import('../app/controllers/sales_modules_controller.js')
const SuppliersController = () => import('../app/controllers/suppliers_controller.js')
const PriceRequestsController = () => import('../app/controllers/price_requests_controller.js')
const PurchaseOrdersController = () => import('../app/controllers/purchase_orders_controller.js')
const SupplierPaymentsController = () => import('../app/controllers/supplier_payments_controller.js')
const OrdersController = () => import('../app/controllers/orders_controller.js')
const QuotesController = () => import('../app/controllers/quotes_controller.js')
const OpportunitiesController = () => import('../app/controllers/opportunities_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')
const ProductsController = () => import('../app/controllers/products_controller.js')

router
  .group(() => {
    router.get('/', [SalesModulesController, 'index'])
  })
  .prefix('/api/sales-backlog')

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
    router.get('/', [SuppliersController, 'index'])
    router.post('/', [SuppliersController, 'store'])
    router.get('/search', [SuppliersController, 'search'])
    router.get('/:id', [SuppliersController, 'show'])
    router.delete('/:id', [SuppliersController, 'destroy'])
  })
  .prefix('/api/suppliers')

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
    router.post('/order/:id', [QuotesController, 'order'])
    router.get('/:id', [QuotesController, 'show'])
    router.put('/:id', [QuotesController, 'update'])
    router.delete('/:id', [QuotesController, 'destroy'])
  })
  .prefix('/api/quotes')

router
  .group(() => {
    router.get('/', [ProductsController, 'index'])
    router.post('/', [ProductsController, 'store'])
    router.get('/search', [ProductsController, 'search'])
    router.get('/:id', [ProductsController, 'show'])
    router.put('/:id', [ProductsController, 'update'])
    router.delete('/:id', [ProductsController, 'destroy'])
  })
  .prefix('/api/products')

router
  .group(() => {
    router.get('/', [OrdersController, 'index'])
    router.post('/', [OrdersController, 'store'])
    router.get('/generate-pdf/:id', [OrdersController, 'generatePdf'])
    router.get('/:id', [OrdersController, 'show'])
    router.put('/:id', [OrdersController, 'update'])
    router.delete('/:id', [OrdersController, 'destroy'])
  })
  .prefix('/api/orders')

router
  .group(() => {
    router.get('/', [PriceRequestsController, 'index'])
    router.post('/', [PriceRequestsController, 'store'])
    router.get('/:id', [PriceRequestsController, 'show'])
    router.put('/:id', [PriceRequestsController, 'update'])
    router.delete('/:id', [PriceRequestsController, 'destroy'])
  })
  .prefix('/api/price-requests')

router
  .group(() => {
    router.get('/', [PurchaseOrdersController, 'index'])
    router.post('/', [PurchaseOrdersController, 'store'])
    router.get('/generate-pdf/:id', [PurchaseOrdersController, 'generatePdf'])
    router.get('/:id', [PurchaseOrdersController, 'show'])
    router.put('/:id', [PurchaseOrdersController, 'update'])
    router.delete('/:id', [PurchaseOrdersController, 'destroy'])
  })
  .prefix('/api/purchase-orders')

router
  .group(() => {
    router.get('/', [SupplierPaymentsController, 'index'])
    router.post('/', [SupplierPaymentsController, 'store'])
    router.get('/:id', [SupplierPaymentsController, 'show'])
    router.get('/purchase-order/:id', [SupplierPaymentsController, 'showFromPurchaseOrder'])
    router.put('/:id', [SupplierPaymentsController, 'update'])
    router.delete('/:id', [SupplierPaymentsController, 'destroy'])
  })
  .prefix('/api/supplier-payments')

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
