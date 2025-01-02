import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '../../app/models/client.js'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        firstName: 'Olivier',
        lastName: 'Bonhomme',
        email: 'olivier.bonhomme@airbus.fr',
      },
      {
        firstName: 'Neil',
        lastName: 'Armstrong',
        email: 'neil.armstrong@nasa.com',
      },
    ])
  }
}
