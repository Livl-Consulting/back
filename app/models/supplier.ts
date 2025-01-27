import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import PurchaseOrder from './purchase_order.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PriceRequest from './price_request.js'
import SupplierPayment from './supplier_payment.js'

export default class Supplier extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare lastName: string

  @column()
  declare firstName: string

  @column()
  declare companyName?: string

  @column()
  declare email: string

  @hasMany(() => PurchaseOrder)
  declare purchaseOrders: HasMany<typeof PurchaseOrder>

  @hasMany(() => PriceRequest)
  declare priceRequests: HasMany<typeof PriceRequest>

  @hasMany(() => SupplierPayment)
  declare supplierPayments: HasMany<typeof SupplierPayment>
}