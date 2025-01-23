import vine from '@vinejs/vine'

export const createOrderValidator = vine.compile(
    vine.object({
        clientId: vine.number(),
        price: vine.number().min(0),
        productId: vine.number(),
        quoteId: vine.number().optional()
    })
)

export const findOrderParamsValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number()
        })
    })
)
