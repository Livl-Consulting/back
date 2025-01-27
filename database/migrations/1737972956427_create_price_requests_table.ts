import { BaseSchema } from '@adonisjs/lucid/schema'
import { SalesProcessStatus } from '../../app/types/sale_process_status.js'

export default class extends BaseSchema {
  protected tableName = 'price_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('supplier_id').unsigned().references('id').inTable('suppliers').onDelete('CASCADE')
      table.enum('status', ['progress', 'validated', 'cancelled'] satisfies SalesProcessStatus[])
        .defaultTo('progress')
        .notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}