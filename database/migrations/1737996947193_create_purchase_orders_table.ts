import { BaseSchema } from '@adonisjs/lucid/schema'
import { PurchaseOrderStatus } from '../../app/types/purchase_order_status.js'

export default class extends BaseSchema {
  protected tableName = 'purchase_orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('supplier_id').unsigned().notNullable().references('suppliers.id')
      table.enum('status', ['progress', 'received', 'invoiced', 'cancelled'] satisfies PurchaseOrderStatus[]).defaultTo('progress').notNullable()

      table.integer('price_request_id').unsigned().references('price_requests.id').nullable().unique()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}