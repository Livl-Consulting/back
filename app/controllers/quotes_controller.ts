// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http"
import Quote from "../models/quote.js"
import { findQuoteParamsValidator, quoteValidator } from "../validators/quote.js"

export default class QuotesController {
    public async index({}: HttpContext) {
        const quotes = await Quote.query().preload('client').preload('product').preload('opportunity')
        return quotes.map(quote => quote.serialize())
      }
    
      public async store({ request }: HttpContext) {
        const payload = await request.validateUsing(quoteValidator)
    
        return await Quote.create(payload)
      }
    
      public async show({ request }: HttpContext) {
        const data = await request.validateUsing(findQuoteParamsValidator)
    
        return await Quote.query().where('id', data.params.id).preload('client').firstOrFail()
      }
    
      public async update({ request }: HttpContext) {
        const data = await request.validateUsing(findQuoteParamsValidator)
    
        const quote = await Quote.findOrFail(data.params.id)

        if(quote.status === 'validated') {
            throw new Error('You cannot update a validated quote')
        }

        const payload = await request.validateUsing(quoteValidator)
    
        quote.merge(payload)
        await quote.save()
    
        return quote
      }
    
      public async destroy({ request }: HttpContext) {
        const data = await request.validateUsing(findQuoteParamsValidator)
    
        const quote = await Quote.findOrFail(data.params.id)
        await quote.delete()
    
        return { message: 'Quote deleted successfully' }
      }
}