import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'opportunities'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('price').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('price')
    })
  }
}