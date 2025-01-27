import vine from '@vinejs/vine'
import { ProductType } from '../types/product_type.js'

export const productValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    description: vine.string().optional(),
    price: vine.number().min(0),
    type: vine.enum(['sale', 'purchase', 'both'] satisfies ProductType[]),
  })
)

export const findProductParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
