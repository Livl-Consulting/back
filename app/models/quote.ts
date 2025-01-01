import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from './client.js'
import Product from './product.js'
import Opportunity from './opportunity.js'
import type { SalesProcessStatus } from './sale-process-status.js'


export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare status: SalesProcessStatus

  @column()
  declare successProbability: number

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

  @column()
  declare opportunityId?: number

  @belongsTo(() => Opportunity)
  declare opportunity: BelongsTo<typeof Opportunity>
}