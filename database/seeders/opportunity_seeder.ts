import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Opportunity from '../../app/models/opportunity.js'

export default class extends BaseSeeder {
  async run() {
    await Opportunity.createMany([
      {
        successProbability: 80,
        status: 'validated',
        price: 15000,
        clientId: 1,
        productId: 1,
      },
      {
        successProbability: 70,
        status: 'progress',
        price: 200,
        clientId: 1,
        productId: 2,
      },
      {
        successProbability: 10,
        status: 'progress',
        price: 50000,
        clientId: 2,
        productId: 1,
      },
      {
        successProbability: 50,
        status: 'cancelled',
        price: 35000,
        clientId: 2,
        productId: 2,
      },
    ])
  }
}
