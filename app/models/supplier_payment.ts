import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Supplier from './supplier.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { PaymentMethod } from '../types/payment_method.js'
import PurchaseOrder from './purchase_order.js'

export default class SupplierPayment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare supplierId: number;

  @belongsTo(() => Supplier)
  declare supplier: BelongsTo<typeof Supplier>;

  @column()
  declare amount: number;

  @column()
  declare notes?: string;

  @column()
  declare paymentMethod: PaymentMethod;

  @column.date({ autoCreate: true })
  declare paymentDate: DateTime;

  @column()
  declare purchaseOrderId: number;

  @belongsTo(() => PurchaseOrder)
  declare purchaseOrder: BelongsTo<typeof PurchaseOrder>
}