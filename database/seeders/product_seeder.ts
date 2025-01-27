import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Project Management',
        price: 100,
        description: 'Product Gestion de Projet description',
        type: 'both'
      },
      {
        name: 'Developpement Web',
        price: 200,
        description: 'Product 2 description',
        type: 'both'
      },
    ])
  }
}
