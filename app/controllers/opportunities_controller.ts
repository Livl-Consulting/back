import type { HttpContext } from '@adonisjs/core/http'
import Opportunity from '../models/opportunity.js'
import {
  createOpportunityValidator,
  findOpportunityParamsValidator,
  opportunityValidator,
} from '../validators/opportunity.js'
import Quote from '../models/quote.js'
import Product from '../models/product.js'

export default class OpportunityController {
  public async index({}: HttpContext) {
    const opportunities = await Opportunity.query().preload('client').preload('product')
    return opportunities.map((opportunity) => opportunity.serialize())
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createOpportunityValidator)

    // Check if product type is 'sale'
    const product = await Product.findOrFail(payload.productId)
    if (product.type == 'purchase') {
      throw new Error('You can only create opportunities for sale products')
    }

    const opportunity = await Opportunity.create(payload)

    const refreshedOpportunity = await opportunity.refresh()
    await refreshedOpportunity.load('client')
    await refreshedOpportunity.load('product')
    return refreshedOpportunity.serialize()
  }

  // Make an opportunity become a Quote
  public async quote({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)

    const opportunity = await Opportunity.findOrFail(data.params.id)

    if(opportunity.status === 'cancelled')
      throw new Error('You cannot create a quote from a cancelled opportunity')

    // Check if Quote with opportunityId already exists
    const existingQuote = await Quote.findBy('opportunityId', opportunity.id)
    if (existingQuote) {
      throw new Error('Quote already exists')
    }

    const quote = await Quote.create({
      opportunityId: opportunity.id,
      clientId: opportunity.clientId,
      productId: opportunity.productId,
      price: opportunity.price,
      successProbability: opportunity.successProbability,
      status: 'progress',
    })

    // Make this opportunity as "validated"
    opportunity.status = 'validated'
    await opportunity.save()

    return quote.serialize()
  }

  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)

    return (await Opportunity.query().where('id', data.params.id).preload('client').firstOrFail()).serialize()
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)

    const opportunity = await Opportunity.findOrFail(data.params.id)
    const payload = await request.validateUsing(opportunityValidator)

    if (opportunity.status === 'validated' || opportunity.status === 'cancelled') {
      throw new Error('You cannot update a validated or cancelled opportunity')
    }

    opportunity.merge(payload)
    await opportunity.save()

    return opportunity.serialize()
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)

    const opportunity = await Opportunity.findOrFail(data.params.id)

    // Make this opportunity as "cancelled"
    opportunity.status = 'cancelled'
    await opportunity.save()

    return { message: 'Opportunity has been set as cancelled' }
  }
}
