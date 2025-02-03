import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '../../app/models/order.js'
import { DateTime } from 'luxon'

export default class OrderSeeder extends BaseSeeder {
  async run() {
    await Order.createMany([
      {
        status: 'delivered',
        quoteId: 1,
        clientId: 1,
        productId: 1,
        price: 15000,
        dueDate: DateTime.local().plus({ days: 5 }),
      },
      {
        status: 'progress',
        quoteId: 2,
        clientId: 2,
        productId: 2,
        price: 20000,
        dueDate: DateTime.local().plus({ days: 40 }),
      },
    ])
  }
}