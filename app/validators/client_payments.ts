import vine from '@vinejs/vine'
import { PaymentMethod } from '../types/payment_method.js'
import { DateTime } from 'luxon'

export const createClientPaymentValidator = vine.compile(
  vine.object({
    orderId: vine.number().min(1),
    amount: vine.number().min(0.01),
    paymentMethod: vine.enum([
      'bank_transfer',
      'credit_card',
      'cash',
      'other',
      'paypal',
      'sexe',
      'check',
    ] satisfies PaymentMethod[]),
    notes: vine.string().optional(),
    paymentDate: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
  })
)

export const findClientPaymentParamsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)

export const updateClientPaymentValidator = vine.compile(
  vine.object({
    paymentMethod: vine
      .enum([
        'bank_transfer',
        'credit_card',
        'cash',
        'other',
        'paypal',
        'sexe',
        'check',
      ] satisfies PaymentMethod[])
      .optional(),
    notes: vine.string().optional(),
    paymentDate: vine.date().transform((date) => DateTime.fromJSDate(date)),
  })
)
