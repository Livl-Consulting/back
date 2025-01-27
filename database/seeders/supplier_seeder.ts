import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Supplier from '#models/supplier'

export default class SupplierSeeder extends BaseSeeder {
  async run() {
    await Supplier.createMany([
      {
        firstName: 'Mica',
        lastName: 'Gelahsuen',
        companyName: 'Fournisseur ITIL',
        email: 'mica.gelahsuen@itil.fr"',
      },
      {
        firstName: 'Virginie',
        lastName: 'Eckbolsheim',
        companyName: 'Fournisseur UIMM',
        email: 'virginie.ecbkbolsheiml@uimm.fr"',
      },
    ])
  }
}
