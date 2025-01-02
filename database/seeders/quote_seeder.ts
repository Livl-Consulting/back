import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Quote from '../../app/models/quote.js'

export default class extends BaseSeeder {
  async run() {
    await Quote.createMany([
      {
        successProbability: 80,
        status: 'progress',
        price: 15000,
        clientId: 1,
        productId: 1,
        opportunityId: 1,
      },
      {
        successProbability: 60,
        status: 'progress',
        price: 20000,
        clientId: 1,
        productId: 2,
      },
    ])
  }
}
