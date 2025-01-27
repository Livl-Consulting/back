import vine from "@vinejs/vine";
import { PurchaseOrderStatus } from "../types/purchase_order_status.js";

export const createPurchaseOrderValidator = vine.compile(
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

export const updatePurchaseOrderValidator = vine.compile(
    vine.object({
        status: vine.enum(['progress', 'received', 'invoiced', 'cancelled'] satisfies PurchaseOrderStatus[]),
    })
)

export const findPurchaseOrderParamsValidator = vine.compile(
    vine.object({
      params: vine.object({
        id: vine.number(),
      }),
    })
)