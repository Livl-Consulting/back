import { BaseSchema } from '@adonisjs/lucid/schema'
import { OpportunityStatusType } from '../../app/models/opportunity.js'

export default class extends BaseSchema {
  protected tableName = 'opportunities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('success_opportunity').notNullable()
      table.enum('status', ['progress', 'validated', 'cancelled'] satisfies OpportunityStatusType[]).defaultTo('progress').notNullable()
      table.integer('client_id').unsigned().references(`clients.id`).onDelete('CASCADE').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}