import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '../../app/models/order.js'

export default class OrderSeeder extends BaseSeeder {
  async run() {
    await Order.createMany([
      {
        status: 'progress',
        quoteId: 1,
        clientId: 1,
        productId: 1,
        price: 1000,
      },
    ])
  }
}