// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Quote from '../models/quote.js'
import {
  createQuoteValidator,
  findQuoteParamsValidator,
  quoteValidator,
} from '../validators/quote.js'

export default class QuotesController {
  public async index({}: HttpContext) {
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

    const quote = await Quote.create(payload)
    const refreshedQuote = await quote.refresh()
    return refreshedQuote.serialize()
  }

  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findQuoteParamsValidator)

    return await Quote.query().where('id', data.params.id).preload('client').firstOrFail()
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

    // Set the status to "cancelled" before deleting
    quote.status = 'cancelled'
    await quote.save()

    return { message: 'Quote set to cancelled' }
  }
}
