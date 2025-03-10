import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export type CreateClientValidatorType = {
  lastName: string
  firstName: string
  companyName?: string
  email: string
}
export const createClientValidator = vine.compile(
  vine.object({
    lastName: vine.string().minLength(2),
    firstName: vine.string().minLength(2),
    companyName: vine.string().optional(),
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'clients', column: 'email', primaryKey: 'id' })),
  })
)

export const findClientParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)

export const searchClientValidator = vine.compile(
  vine.object({
    query: vine.string().minLength(2),
  })
)
