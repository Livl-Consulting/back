import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ProductType } from '../types/product_type.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import PriceRequest from './price_request.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare price: number

  @column()
  declare type: ProductType

  @manyToMany(() => PriceRequest, {
      pivotColumns: ['quantity', 'unit_price'],
      pivotTable: 'price_request_products',
      pivotTimestamps: true
  })
  declare products: ManyToMany<typeof PriceRequest>

  serializeExtras = true // This is a flag to include the pivot columns in the serialization
}
