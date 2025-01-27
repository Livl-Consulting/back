import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Supplier from './supplier.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import type { SalesProcessStatus } from '../types/sale_process_status.js'
import Product from './product.js'

export default class PriceRequest extends BaseModel {
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
  declare status: SalesProcessStatus

  @manyToMany(() => Product, {
    pivotTable: 'price_request_products',
    pivotColumns: ['quantity', 'unit_price'],
    pivotTimestamps: true
  })
  declare products: ManyToMany<typeof Product>
}