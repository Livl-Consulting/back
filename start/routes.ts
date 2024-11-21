/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const OpportunitiesController = () => import('../app/controllers/opportunities_controller.js')
const ClientsController = () => import('../app/controllers/clients_controller.js')


router.group(() =>
  {
    router.get('/', [ClientsController, 'index'])
    router.post('/', [ClientsController, 'store'])
    router.get('/:id', [ClientsController, 'show'])
    //router.put('/:id', [ClientsController, 'update'])
    router.delete('/:id', [ClientsController, 'destroy'])
  }
).prefix('/api/clients')

router.group(() => 
  {
    router.get('/', [OpportunitiesController, 'index'])
    router.post('/', [OpportunitiesController, 'store'])
    router.get('/:id', [OpportunitiesController, 'show'])
    router.put('/:id', [OpportunitiesController, 'update'])
    router.delete('/:id', [OpportunitiesController, 'destroy'])
  }
).prefix('/api/opportunities')