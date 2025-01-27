import vine from "@vinejs/vine";

export const createPriceRequestValidator = vine.compile(
    vine.object({
        supplierId: vine.number(),
        products: vine.array(
        vine.object({
            id: vine.number(),
            quantity: vine.number().min(1), 
            unit_price: vine.number().min(0),
        })
        ),
    })
)

export const updatePriceRequestValidator = vine.compile(
    vine.object({
        status: vine.enum(['progress', 'validated', 'cancelled']), // Define allowed statuses
    })
)

export const findPriceRequestParamsValidator = vine.compile(
    vine.object({
      params: vine.object({
        id: vine.number(),
      }),
    })
)