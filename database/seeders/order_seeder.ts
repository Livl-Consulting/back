import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '../../app/models/order.js'

export default class OrderSeeder extends BaseSeeder {
  async run() {
    await Order.createMany([
      {
        status: 'delivered',
        quoteId: 1,
        clientId: 1,
        productId: 1,
        price: 15000,
      },
      {
        status: 'invoiced',
        quoteId: 2,
        clientId: 2,
        productId: 2,
        price: 20000,
      },
      
    ])
  }
}