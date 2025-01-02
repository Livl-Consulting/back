import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '../../app/models/client.js'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        firstName: 'Olivier',
        lastName: 'Bonhomme',
        companyName: 'Airbus',
        email: 'olivier.bonhomme@airbus.fr',
      },
      {
        firstName: 'Neil',
        lastName: 'Armstrong',
        companyName: 'NASA',
        email: 'neil.armstrong@nasa.com',
      },
    ])
  }
}
