import vine from '@vinejs/vine'

export const productValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    description: vine.string().optional(),
    price: vine.number().min(0),
  })
)

export const findProductParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
