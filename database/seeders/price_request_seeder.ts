import PriceRequest from '#models/price_request'
import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

interface ProductDetails {
  quantity: number;
  unit_price: number;
}

export default class PriceRequestSeeder extends BaseSeeder {
  async run() {
    // Fetch existing products
    const products = await Product.query().where('type', 'both').orWhere('type', 'purchase').exec()

    // Create a new PriceRequest
    const priceRequest = await PriceRequest.create({
      supplierId: 1, // Assuming you have a supplier with ID 1
      status: 'progress'
    })

    // Attach products to the price request with pivot data
    const productPayload = products.reduce<Record<number, ProductDetails>>((acc, product) => {
      acc[product.id] = {
        quantity: 10,
        unit_price: product.price,
      };
      return acc;
    }, {});

    await priceRequest.related('products').attach(productPayload)
  }
}