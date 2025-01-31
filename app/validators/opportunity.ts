import vine from '@vinejs/vine'
import { SalesProcessStatus } from '../types/sale_process_status.js'

export const createOpportunityValidator = vine.compile(
  vine.object({
    clientId: vine.number(),
    successProbability: vine.number().min(0).max(100),
    price: vine.number().min(0),
    productId: vine.number(),
  })
)

export const opportunityValidator = vine.compile(
  vine.object({
    clientId: vine.number(),
    successProbability: vine.number().min(0).max(100),
    status: vine.enum(['progress', 'validated', 'cancelled'] satisfies SalesProcessStatus[]),
    price: vine.number().min(0),
    productId: vine.number(),
  })
)

export const findOpportunityParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
