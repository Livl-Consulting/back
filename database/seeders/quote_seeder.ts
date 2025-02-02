import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Quote from '../../app/models/quote.js'

export default class extends BaseSeeder {
  async run() {
    await Quote.createMany([
      {
        successProbability: 80,
        status: 'validated',
        price: 15000,
        clientId: 1,
        productId: 1,
        opportunityId: 1,
      },
      {
        successProbability: 60,
        status: 'validated',
        price: 20000,
        clientId: 2,
        productId: 2,
      },
      {
        successProbability: 60,
        status: 'progress',
        price: 10000,
        clientId: 1,
        productId: 2,
      },
      {
        successProbability: 1,
        status: 'cancelled',
        price: 2000,
        clientId: 1,
        productId: 2,
      },
      {
        successProbability: 20,
        status: 'progress',
        price: 35000,
        clientId: 3,
        productId: 1,
      },
      {
        successProbability: 40,
        status: 'progress',
        price: 55000,
        clientId: 4,
        productId: 1,
      },
    ])
  }
}
