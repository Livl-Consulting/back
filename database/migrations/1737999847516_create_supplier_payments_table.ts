import { BaseSchema } from '@adonisjs/lucid/schema'
import { PaymentMethod } from '../../app/types/payment_method.js'

export default class extends BaseSchema {
  protected tableName = 'supplier_payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('supplier_id').unsigned().notNullable().references('suppliers.id')
      table.integer('purchase_order_id').unsigned().notNullable().references('purchase_orders.id')
      table.float('amount').notNullable()
      table.string('notes').nullable()
      table
        .enum('payment_method', [
          'cash',
          'check',
          'credit_card',
          'bank_transfer',
          'sexe',
          'other',
        ] satisfies PaymentMethod[])
        .notNullable()
      table.timestamp('payment_date').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
