import vine from '@vinejs/vine'
import { OpportunityStatusType } from '../models/opportunity.js'

export const opportunityValidator = vine.compile(
    vine.object({
        clientId: vine.number(),
        successOpportunity: vine.number().min(0).max(100),
        status: vine.enum(['progress', 'validated', 'cancelled'] satisfies OpportunityStatusType[])
    })
)

export const findOpportunityParamsValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number()
        })
    })
)