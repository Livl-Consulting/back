import { BaseSchema } from '@adonisjs/lucid/schema'
import { OrderStatus } from '../../app/types/order_status.js'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.float('price').notNullable()

      table.integer('quote_id').unsigned().notNullable().references(`quotes.id`)
      table.integer('client_id').unsigned().notNullable().references(`clients.id`)
      table.integer('product_id').unsigned().notNullable().references(`products.id`)
      table.enum('status', ['progress', 'delivered', 'cancelled', 'invoiced'] satisfies OrderStatus[]).defaultTo('progress')


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}