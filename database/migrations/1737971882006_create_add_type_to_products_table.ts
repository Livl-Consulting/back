import { BaseSchema } from '@adonisjs/lucid/schema'
import { ProductType } from '../../app/types/product_type.js'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('type', ['sale', 'purchase', 'both'] satisfies ProductType[]).defaultTo('both')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('type')
    })  
  }
}