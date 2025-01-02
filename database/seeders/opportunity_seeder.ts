import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Opportunity from '../../app/models/opportunity.js'

export default class extends BaseSeeder {
  async run() {
    await Opportunity.createMany([
      {
        successProbability: 80,
        status: 'progress',
        price: 15000,
        clientId: 1,
        productId: 1,
      },
      {
        successProbability: 60,
        status: 'validated',
        price: 20000,
        clientId: 1,
        productId: 2,
      },
      {
        successProbability: 90,
        status: 'progress',
        price: 30000,
        clientId: 2,
        productId: 1,
      },
      {
        successProbability: 70,
        status: 'progress',
        price: 25000,
        clientId: 2,
        productId: 2,
      },
    ])
  }
}
