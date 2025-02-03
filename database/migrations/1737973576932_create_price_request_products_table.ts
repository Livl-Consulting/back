import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'price_request_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table
        .integer('price_request_id')
        .unsigned()
        .references('id')
        .inTable('price_requests')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.unique(['price_request_id', 'product_id'])

      table.integer('quantity').unsigned().notNullable()
      table.decimal('unit_price', 12, 2).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
