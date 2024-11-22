import type { HttpContext } from '@adonisjs/core/http'
import Opportunity from '../models/opportunity.js'
import { findOpportunityParamsValidator, opportunityValidator } from '../validators/opportunity.js'

export default class OpportunityController {

  public async index({ }: HttpContext) {
    const opportunities = await Opportunity.query()
      .preload('client')

    return opportunities
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(opportunityValidator)

    const opportunity = await Opportunity.create(payload)

    return opportunity
  }

  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)
    console.log("HEEH")

    const opportunity = await Opportunity.query()
      .where('id', data.params.id)
      .preload('client')
      .firstOrFail()

    return opportunity
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)

    const opportunity = await Opportunity.findOrFail(data.params.id)
    const payload = await request.validateUsing(opportunityValidator)

    opportunity.merge(payload)
    await opportunity.save()

    return opportunity
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findOpportunityParamsValidator)

    const opportunity = await Opportunity.findOrFail(data.params.id)
    await opportunity.delete()

    return { message: 'Opportunity deleted successfully' }
  }
}
