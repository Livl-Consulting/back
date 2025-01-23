import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import type { SalesProcessStatus } from '../types/sale_process_status.js'
import Product from './product.js'
import Quote from './quote.js'

export default class Opportunity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare successProbability: number

  @column()
  declare status: SalesProcessStatus

  @column()
  declare price: number

  @column()
  declare clientId: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @column()
  declare productId: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @hasOne(() => Quote)
  declare quote: HasOne<typeof Quote>
}
