import PriceRequest from '#models/price_request'
import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PriceRequestSeeder extends BaseSeeder {
  async run() {
    const productCashierMaterial = await Product.findBy('id', 8)
    const productCashierMaterial2 = await Product.findBy('id', 9)
    const supplierCashier = 1; // Matériel de caisse LIDL

    if (productCashierMaterial && productCashierMaterial2) {
      const priceRequest = await PriceRequest.create({
        supplierId: supplierCashier,
        status: 'progress'
      })

      await priceRequest.related('products').attach({
        [productCashierMaterial.id]: {
          quantity: 5,
          unit_price: productCashierMaterial.price,
        },
        [productCashierMaterial2.id]: {
          quantity: 3,
          unit_price: productCashierMaterial2.price,
        }
      })
    }
  }
}