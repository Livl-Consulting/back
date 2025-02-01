import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { PaymentMethod } from '../types/payment_method.js'
import Order from './order.js'

export default class ClientPayment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare clientId: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @column()
  declare amount: number

  @column()
  declare notes?: string

  @column.date({ autoCreate: true })
  declare paymentDate: DateTime

  @column()
  declare paymentMethod: PaymentMethod

  @column()
  declare orderId: number

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}