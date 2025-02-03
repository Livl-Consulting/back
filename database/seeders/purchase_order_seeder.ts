import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'
import PurchaseOrder from '../../app/models/purchase_order.js'
import { DateTime } from 'luxon'

export default class PurchaseOrderSeeder extends BaseSeeder {
  async run() {
    //const productCashierMaterial = await Product.findBy('id', 8)
    const productHosting = await Product.findBy('id', 3)
    const productTester = await Product.findBy('id', 4)

    //const supplierCashier = 1;
    const supplierOVH = 2;
    const supplierTester = 3;

    // if (productCashierMaterial) {
    //   await PurchaseOrder.create({
    //     supplierId: supplierCashier,
    //     status: 'received',
    //     totalAmount: productCashierMaterial.price,
    //   }).then(order => {
    //     order.related('products').attach({
    //       [productCashierMaterial.id]: {
    //         quantity: 1,
    //         unit_price: productCashierMaterial.price,
    //       },
    //     })
    //   })
    // }

    if (productHosting) {
      await PurchaseOrder.create({
        supplierId: supplierOVH,
        status: 'progress',
        totalAmount: productHosting.price,
        dueDate: DateTime.local().plus({ days: 2 }),
      }).then(order => {
        order.related('products').attach({
          [productHosting.id]: {
            quantity: 3,
            unit_price: productHosting.price,
          },
        })
      })
    }

    if (productTester) {
      const quantity = 25;
      await PurchaseOrder.create({
        supplierId: supplierTester,
        status: 'received',
        totalAmount: productTester.price * quantity,
        dueDate: DateTime.local().plus({ days: 60 }),
      }).then(order => {
        order.related('products').attach({
          [productTester.id]: {
            quantity: quantity,
            unit_price: productTester.price,
          },
        })
      })
    }
  }
}
