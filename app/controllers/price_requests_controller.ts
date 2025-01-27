import PriceRequest from '#models/price_request'
import type { HttpContext } from '@adonisjs/core/http'
import {
  createPriceRequestValidator,
  updatePriceRequestValidator,
  findPriceRequestParamsValidator,
} from '../validators/price_request.js'
import Product from '#models/product'

export default class PriceRequestsController {
  public async index({ }: HttpContext) {
    const priceRequests = await PriceRequest.query().preload('supplier').preload('products')
    return priceRequests.map((priceRequest) => priceRequest.serialize())
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPriceRequestValidator)

    const productPayload: Record<number, { quantity: number; unit_price: number }> = {}

    for (const product of payload.products) {
      const retrievedProduct = await Product.findOrFail(product.id)

      if (retrievedProduct.type == 'sale') {
        throw new Error('Product is not purchasable, product type must be "both" or "purchase"')
      }
      
      productPayload[product.id] = { quantity: product.quantity, unit_price: product.unit_price }
    }

    if (Object.keys(productPayload).length == 0) {
        throw new Error('No valid products found')
    }

    const priceRequest = await PriceRequest.create({
        supplierId: payload.supplierId,
        status: 'progress',
    })

    // Attach valid products to the price request
    await priceRequest.related('products').attach(productPayload)

    await priceRequest.load('products')
    await priceRequest.load('supplier')

    return priceRequest.serialize()
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findPriceRequestParamsValidator)
    const payload = await request.validateUsing(updatePriceRequestValidator)

    const priceRequest = await PriceRequest.findOrFail(data.params.id)

    priceRequest.merge(payload)
    await priceRequest.save()
    const refreshedPriceRequest = await priceRequest.refresh()

    return refreshedPriceRequest.serialize()
  }

  public async show({ request }: HttpContext) {
    const { params } = await request.validateUsing(findPriceRequestParamsValidator)

    const priceRequest = await PriceRequest.query()
      .where('id', params.id)
      .preload('supplier')
      .preload('products')
      .firstOrFail()

    return priceRequest.serialize()
  }

    public async destroy({ request }: HttpContext) {
      const data = await request.validateUsing(findPriceRequestParamsValidator)
      const priceRequest = await PriceRequest.findOrFail(data.params.id)
      
      priceRequest.status = 'cancelled'
      await priceRequest.save()
  
      return { message: 'Price Request set to cancelled' }
    }
}
