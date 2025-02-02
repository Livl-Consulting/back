import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '../../app/models/client.js'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        id: 1,
        firstName: 'Olivier',
        lastName: 'Bonhomme',
        companyName: 'Airbus',
        email: 'olivier.bonhomme@airbus.fr',
      },
      {
        id: 2,
        firstName: 'Neil',
        lastName: 'Armstrong',
        companyName: 'NASA',
        email: 'neil.armstrong@nasa.com',
      },
      {
        id: 3,
        firstName: 'Jean Marc',
        lastName: 'MULLER',
        companyName: 'UNISTRA',
        email: 'jean.marce@muller.fr',
      }, 
      {
        id: 4,
        firstName: 'Jeane',
        lastName: 'Barsegian',
        companyName: 'Eurométropole',
        email: 'ecoloe.de.stras@jeane.fr',
      }
    ])
  }
}
