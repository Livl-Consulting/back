import Order from '#models/order'
import { createOrderValidator, findOrderParamsValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersController {
    public async index({}: HttpContext) {
        const orders = await Order.query().preload('client').preload('product')
 
        return orders.map((order) => order.serialize())
    }

    public async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createOrderValidator)

        // check if Order with quoteId already exists(if quoteId is provided)
        if (payload.quoteId) {
            const existingOrder = await Order.findBy('quoteId', payload.quoteId)
            if (existingOrder) {
                throw new Error('Order already exists')
            }
        }

        const order = await Order.create(payload)
        const refreshedOrder = await order.refresh()
        return refreshedOrder.serialize()
    }

    public async show({ request }: HttpContext) {
        const data = await request.validateUsing(findOrderParamsValidator)

        return await Order.query().where('id', data.params.id).preload('client').firstOrFail()
    }

    public async update({ request }: HttpContext) {
        const data = await request.validateUsing(findOrderParamsValidator)

        const order = await Order.findOrFail(data.params.id)

        if(order.status !== 'progress') {
            throw new Error('You cannot update a validated or cancelled order')
        }

        const payload = await request.validateUsing(createOrderValidator)

        order.merge(payload)
        await order.save()

        return order
    }

    public async destroy({ request }: HttpContext) {
        const data = await request.validateUsing(findOrderParamsValidator)

        const order = await Order.findOrFail(data.params.id)

        order.status = 'cancelled'
        await order.save()

        return { message: 'Order set to cancelled' }
    }
}