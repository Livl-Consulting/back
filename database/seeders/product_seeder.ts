import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Project Management',
        price: 100,
        description: 'Product Gestion de Projet description',
        type: 'sale'
      },
      {
        name: 'Developpement Web',
        price: 200,
        description: 'Product 2 description',
        type: 'sale'
      },
      {
        name: 'Boite Noire - Airbus',
        price: 300,
        description: 'La boite noire de la chambre 6',
        type: 'purchase'
      },
      {
        name: 'Prestataire à acheter / vendre',
        price: 400,
        description: 'Achat / revente lol',
        type: 'both'
      },
    ])
  }
}
