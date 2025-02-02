import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'
import PurchaseOrder from '../../app/models/purchase_order.js'

interface ProductDetails {
  quantity: number;
  unit_price: number;
}

export default class PurchaseOrderSeeder extends BaseSeeder {
  async run() {
    // Fetch existing products
    const products = await Product.query().where('type', 'both').orWhere('type', 'purchase').exec()

    // Write your database queries inside the run method
    const purchaseQuantity = 2;
    const purchaseOrder = await PurchaseOrder.create({
      supplierId: 1,
      status: 'received',
      totalAmount: products.reduce((acc, product) => acc + (product.price * purchaseQuantity), 0),
    })

    const productPayload = products.reduce<Record<number, ProductDetails>>((acc, product) => {
      acc[product.id] = {
        quantity: purchaseQuantity,
        unit_price: product.price,
      };
      return acc;
    }, {});

    // Ajoute des produits à la commande avec des données pivot
    await purchaseOrder.related('products').attach(productPayload)
  }
}