import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const createClientValidator = vine.compile(
    vine.object({
        lastName: vine.string().minLength(2),
        firstName: vine.string().minLength(2),
        email: vine.string().email().use(
            uniqueRule({ table: 'clients', column: 'email', primaryKey: 'id' })
          )
    })
)

export const findClientParamsValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number()
        })
    })
)