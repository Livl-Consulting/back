import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { OrderStatus } from '../types/order_status.js'

export const createOrderValidator = vine.compile(
    vine.object({
        clientId: vine.number(),
        price: vine.number().min(0),
        productId: vine.number(),
        quoteId: vine.number().optional(),
        dueDate: vine.date().transform((date) => DateTime.fromJSDate(date)),
    })
)

export const findOrderParamsValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number()
        })
    })
)

export const updateOrderValidator = vine.compile(
    vine.object({
        status: vine.enum(['progress', 'delivered', 'invoiced', 'cancelled'] satisfies OrderStatus[]),
    })
)