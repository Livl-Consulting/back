import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_order_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('purchase_order_id').unsigned().notNullable().references('purchase_orders.id')
      table.integer('product_id').unsigned().notNullable().references('products.id')
      table.integer('quantity').notNullable()
      table.float('unit_price').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}