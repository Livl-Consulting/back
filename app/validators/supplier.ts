import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const createSupplierValidator = vine.compile(
  vine.object({
    lastName: vine.string().minLength(2),
    firstName: vine.string().minLength(2),
    companyName: vine.string().optional(),
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'suppliers', column: 'email', primaryKey: 'id' })),
  })
)

export const findSupplierParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)

export const searchSupplierValidator = vine.compile(
  vine.object({
    query: vine.string().minLength(2),
  })
)
