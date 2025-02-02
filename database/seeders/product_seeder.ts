import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        id: 1,
        name: 'Gestion de projet',
        price: 15000,
        description: 'Gestion de projet en agilité',
        type: 'sale'
      },
      {
        id: 2,
        name: 'Developpement',
        price: 20000,
        description: 'Tous types de développement',
        type: 'sale'
      },
      {
        id: 3,
        name: 'Hébergement',
        price: 100,
        description: 'Hébergement des sites web',
        type: 'purchase'
      },
      {
        id: 4,
        name: 'Prestataire testeur Tchétchénien',
        price: 400,
        description: 'Achat et location de prestataire Tchétchénien',
        type: 'both'
      },
      {
        id: 5,
        name: 'Application de Complex Event Processing',
        price: 150000,
        description: 'Application native iOS',
        type: 'sale'
      }, 
      {
        id: 6,
        name: 'Installation de base de données',
        price: 5000,
        description: 'Installation de base de données',
        type: 'sale'
      },
      {
        id: 7,
        name: 'Réalisation de vols assistés par IA',
        price: 100000,
        description: 'Réalisation de vols assistés par IA',
        type: 'sale'
      },
      {
        id: 8,
        name: 'Lecteurs codes-barres',
        price: 100,
        description: 'Lecteur de code barre pour la caisse',
        type: 'purchase'
      },
      {
        id: 9,
        name: 'Tiroirs-caisse',
        price: 1000,
        description: 'Tiroirs-caisse pour la caisse',
        type: 'purchase'
      }, 
      {
        id: 10,
        name: 'Imprimantes tickets',
        price: 500,
        description: 'Imprimantes tickets pour la caisse',
        type: 'purchase'
      }

    ])
  }
}
