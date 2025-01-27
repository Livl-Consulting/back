import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Supplier from './supplier.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import type { PurchaseOrderStatus } from '../types/purchase_order_status.js'
import Product from './product.js'
import SupplierPayment from './supplier_payment.js'

export default class PurchaseOrder extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare supplierId: number

  @belongsTo(() => Supplier)
  declare supplier: BelongsTo<typeof Supplier>

  @column()
  declare status: PurchaseOrderStatus

  @manyToMany(() => Product, {
    pivotColumns: ['quantity', 'unit_price'],
    pivotTable: 'purchase_order_products',
    pivotTimestamps: true,
  })
  declare products: ManyToMany<typeof Product>

  @hasMany(() => SupplierPayment)
  declare supplierPayments: HasMany<typeof SupplierPayment>
}