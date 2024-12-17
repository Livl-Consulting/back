import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export type OpportunityStatusType = 'progress' | 'validated' | 'cancelled'

export default class Opportunity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare successOpportunity: number

  @column()
  declare status: OpportunityStatusType

  @column()
  declare clientId: number

  @column()
  declare price: number

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
}
