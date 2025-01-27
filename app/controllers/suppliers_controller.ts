import type { HttpContext } from '@adonisjs/core/http'
import Supplier from '../models/supplier.js'
import { createSupplierValidator, findSupplierParamsValidator, searchSupplierValidator } from '#validators/supplier'

export default class SuppliersController {
  public async index({}: HttpContext) {
    const Suppliers = await Supplier.all()
    return Suppliers.map((supplier) => supplier.serialize())
  }

  public async search({ request }: HttpContext) {
    const data = await request.validateUsing(searchSupplierValidator)

    return await Supplier.query()
      .where('firstName', 'like', `%${data.query}%`)
      .orWhere('lastName', 'like', `%${data.query}%`)
      .exec()
  }

  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findSupplierParamsValidator)

    const supplier = await Supplier.query()
      .where('id', data.params.id)
      .firstOrFail()

    return supplier
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createSupplierValidator)

    const supplier = await Supplier.create(payload)
    return supplier
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findSupplierParamsValidator)
    const supplier = await Supplier.findOrFail(data.params.id)
    await supplier.delete()

    return { message: 'Supplier deleted successfully' }
  }
}
