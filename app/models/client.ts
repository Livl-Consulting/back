import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Opportunity from './opportunity.js'
import Quote from './quote.js'

export default class Client extends BaseModel {
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

  @hasMany(() => Opportunity)
  declare opportunities: HasMany<typeof Opportunity>

  @hasMany(() => Quote)
  declare quotes: HasMany<typeof Quote>
}
