import vine from '@vinejs/vine'
import { SalesProcessStatus } from '../types/sale_process_status.js'

export const createQuoteValidator = vine.compile(
  vine.object({
    clientId: vine.number(),
    successProbability: vine.number().min(0).max(100),
    price: vine.number().min(0),
    productId: vine.number(),
    opportunityId: vine.number().optional(),
  })
)

export const quoteValidator = vine.compile(
  vine.object({
    clientId: vine.number(),
    successProbability: vine.number().min(0).max(100),
    status: vine.enum(['progress', 'validated', 'cancelled'] satisfies SalesProcessStatus[]),
    price: vine.number().min(0),
    productId: vine.number(),
    opportunityId: vine.number().optional(),
  })
)

export const findQuoteParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
