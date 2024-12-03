import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.string('first_name')
      table.string('last_name')
      table.string('email').unique()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
