// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Quote from '#models/quote'
import {
  createQuoteValidator,
  findQuoteParamsValidator,
  quoteValidator,
} from '../validators/quote.js'
import Order from '#models/order'
import Product from '../models/product.js'
import { DateTime } from 'luxon'

export default class QuotesController {
  public async index({}: HttpContext) {
    // @ts-ignore: TODO Argument of type '"opportunity"' is not assignable to parameter of type 'ExtractModelRelations<Quote>'.
    const quotes = await Quote.query().preload('client').preload('product').preload('opportunity') 

    return quotes.map((quote) => quote.serialize())
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createQuoteValidator)

    // Check if Quote with opportunityId already exists(if opportunityId is provided)
    if (payload.opportunityId) {
      const existingQuote = await Quote.findBy('opportunityId', payload.opportunityId)
      if (existingQuote) {
        throw new Error('Quote already exists')
      }
    }

    // Check if product type is 'sale'
    const product = await Product.findOrFail(payload.productId)
    if (product.type == 'purchase') {
        throw new Error('You can only create opportunities for sale products')
    }

    const quote = await Quote.create(payload)
    const refreshedQuote = await quote.refresh()
    return refreshedQuote.serialize()
  }

  // make a quote become an Order
  public async order({ request }: HttpContext) {
    const data = await request.validateUsing(findQuoteParamsValidator)

    const quote = await Quote.findOrFail(data.params.id)

    if(quote.status === 'cancelled')
      throw new Error('You cannot create an order from a cancelled quote')

    // Check if Order with quoteId already exists
    const existingOrder = await Order.findBy('quoteId', quote.id)
    if (existingOrder) {
      throw new Error('Order already exists')
    }

    const order = await Order.create({
      quoteId: quote.id,
      clientId: quote.clientId,
      productId: quote.productId,
      price: quote.price,
      status: 'progress',
      dueDate: DateTime.now().plus({ days: 31 }),
    })

    // Make this quote as "validated"
    quote.status = 'validated'
    await quote.save()

    return order.serialize()
  }

  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findQuoteParamsValidator)

    return (await Quote.query().where('id', data.params.id).preload('client').firstOrFail()).serialize()
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findQuoteParamsValidator)

    const quote = await Quote.findOrFail(data.params.id)

    if (quote.status === 'validated' || quote.status === 'cancelled') {
      throw new Error('You cannot update a validated or cancelled quote')
    }

    const payload = await request.validateUsing(quoteValidator)

    quote.merge(payload)
    await quote.save()

    return quote
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findQuoteParamsValidator)

    const quote = await Quote.findOrFail(data.params.id)

    quote.status = 'cancelled'
    await quote.save()

    return { message: 'Quote set to cancelled' }
  }
}
