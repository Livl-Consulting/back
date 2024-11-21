import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
    vine.object({
        lastName: vine.string().minLength(2),
        firstName: vine.string().minLength(2),
        email: vine.string().email()
    })
)

export const findClientParamsValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number()
        })
    })
)