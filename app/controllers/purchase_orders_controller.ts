import PurchaseOrder from '#models/purchase_order'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { createPurchaseOrderValidator, findPurchaseOrderParamsValidator, updatePurchaseOrderValidator } from '../validators/purchase_order.js'

export default class PurchaseOrdersController {
  public async index({}: HttpContext) {
    const purchaseOrders = await PurchaseOrder.query().preload('products')
    return purchaseOrders.map((order) => order.serialize())
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPurchaseOrderValidator)

    const productPayload: Record<number, { quantity: number; unit_price: number }> = {}

    for (const product of payload.products) {
      const retrievedProduct = await Product.findOrFail(product.id)
      if (retrievedProduct.type == 'sale') {
        throw new Error('Product is not purchasable, product type must be "both" or "purchase"')
      }
      productPayload[product.id] = { quantity: product.quantity, unit_price: product.unit_price }
    }

    const purchaseOrder = await PurchaseOrder.create({
      supplierId: payload.supplierId,
      status: 'progress',
    })

    await purchaseOrder.related('products').attach(productPayload)
    await purchaseOrder.load('products')
    await purchaseOrder.load('supplier')

    return purchaseOrder.serialize()
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findPurchaseOrderParamsValidator)
    const payload = await request.validateUsing(updatePurchaseOrderValidator)

    const purchaseOrder = await PurchaseOrder.findOrFail(data.params.id)
    purchaseOrder.merge(payload)
    await purchaseOrder.save()

    return purchaseOrder.serialize()
  }

  public async show({ request }: HttpContext) {
    const { params } = await request.validateUsing(findPurchaseOrderParamsValidator)

    const purchaseOrder = await PurchaseOrder.query()
      .where('id', params.id)
      .preload('products')
      .firstOrFail()

    return purchaseOrder.serialize()
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findPurchaseOrderParamsValidator)

    const purchaseOrder = await PurchaseOrder.findOrFail(data.params.id)
    purchaseOrder.status = 'cancelled'
    await purchaseOrder.save()

    return { message: 'Purchase order cancelled' }
  }
}
