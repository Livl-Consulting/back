import type { HttpContext } from '@adonisjs/core/http'
import Client from '../models/client.js'
import { createClientValidator, findClientParamsValidator } from '../validators/client.js'

export default class ClientsController {

    public async index({}: HttpContext) {
        const clients = await Client.query().preload('opportunities')
        return clients
    }

    public async show({ request }: HttpContext) {
        const data = await request.validateUsing(findClientParamsValidator)

        const client = await Client.query()
            .where('id', data.params.id)
            .preload('opportunities')
            .firstOrFail()

        return client
    }

    public async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createClientValidator)
    
        const client = await Client.create(payload)
        return client
      }

    public async destroy({ request }: HttpContext) {
        const data = await request.validateUsing(findClientParamsValidator)
        const client = await Client.findOrFail(data.params.id)
        await client.delete()

        return { message: 'Client deleted successfully' }
    }
}