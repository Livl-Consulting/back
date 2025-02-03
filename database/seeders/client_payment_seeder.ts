import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import ClientPayment from '../../app/models/client_payment.js'

export default class ClientPaymentsSeeder extends BaseSeeder {
  public async run() {
    // Create a new payment
    await ClientPayment.create({
      clientId: 2,
      orderId: 2,
      amount: 10000, // Assuming full payment - 50% of the total amount
      paymentMethod: 'bank_transfer', // Example payment method
      notes: 'Versement client de 50% du montant total',
      paymentDate: DateTime.now(),
    })
  }
}
