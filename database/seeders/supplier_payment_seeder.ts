import { BaseSeeder } from '@adonisjs/lucid/seeders'
import SupplierPayment from '../../app/models/supplier_payment.js'
import PurchaseOrder from '../../app/models/purchase_order.js'
import { DateTime } from 'luxon'

export default class SupplierPaymentSeeder extends BaseSeeder {
  public async run() {
    // Fetch existing purchase orders
    const purchaseOrders = await PurchaseOrder.query().preload('products').where('status', 'received').exec()

    // Iterate over each purchase order and create a payment
    for (const purchaseOrder of purchaseOrders) {
      // Calculate the total amount to pay for the purchase order
      let totalAmountToPay = 0

      purchaseOrder.products.forEach((product) => {
        totalAmountToPay += product.$extras.pivot_quantity * product.$extras.pivot_unit_price
      })

      // Create a new payment
      await SupplierPayment.create({
        supplierId: purchaseOrder.supplierId,
        purchaseOrderId: purchaseOrder.id,
        amount: totalAmountToPay-1, // Assuming full payment - 1
        paymentMethod: 'bank_transfer', // Example payment method
        notes: 'Payment for purchase order 1',
        paymentDate: DateTime.now(),
      })
    }
  }
}
