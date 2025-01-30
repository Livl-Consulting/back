import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Project Management',
        price: 16000,
        description: 'Gestion de projet en agilité',
        type: 'sale'
      },
      {
        name: 'Developpement Web',
        price: 20000,
        description: 'Angular / React / Vue.js',
        type: 'sale'
      },
      {
        name: 'Boite Noire - Airbus',
        price: 30000,
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
