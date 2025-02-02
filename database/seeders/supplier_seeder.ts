import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Supplier from '#models/supplier'

export default class SupplierSeeder extends BaseSeeder {
  async run() {
    await Supplier.createMany([
      {
        firstName: 'John Paul',
        lastName: 'Scally',
        companyName: 'Matériel de caisse LIDL',
        email: 'john.paul@lidl.com'
      },
      {
        firstName: 'Octave',
        lastName: 'Klaba',
        companyName: 'OVH',
        email: 'octave.klaba@ovh.com'
      },
      {
        firstName: 'Saidakhmed',
        lastName: 'Kadyrov',
        companyName: 'Tchétchénie Consulting',
        email: 'saidakmed.kadyr@tchechenie.consulting.com'
      }
    ])
  }
}
