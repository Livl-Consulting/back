import { BaseSchema } from '@adonisjs/lucid/schema'
import { SalesProcessStatus } from '../../app/types/sale_process_status.js'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('success_probability').notNullable()
      table.float('price').notNullable

      table
        .enum('status', ['progress', 'validated', 'cancelled'] satisfies SalesProcessStatus[])
        .defaultTo('progress')
        .notNullable()

      table.integer('client_id').unsigned().references(`clients.id`).notNullable()
      table.integer('product_id').unsigned().references(`products.id`).notNullable()
      table.integer('opportunity_id').unsigned().references(`opportunities.id`).nullable().unique() // Can be null and if not, must be unique to avoid multiple quotes for the same opportunity
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
