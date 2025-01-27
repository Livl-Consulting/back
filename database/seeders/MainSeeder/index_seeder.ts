import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../client_seeder.js'))
    await this.runSeeder(await import('../product_seeder.js'))
    await this.runSeeder(await import('../opportunity_seeder.js'))
    await this.runSeeder(await import('../quote_seeder.js'))
    await this.runSeeder(await import('../order_seeder.js'))
    await this.runSeeder(await import('../supplier_seeder.js'))
    await this.runSeeder(await import('../price_request_seeder.js'))
  }
}
