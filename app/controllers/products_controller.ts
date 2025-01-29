import Product from '#models/product'
import { findProductParamsValidator, productValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import { searchClientValidator } from '#validators/client'

export default class ProductsController {
  public async index({}: HttpContext) {
    const products = await Product.all()
    console.log(products.map((product) => product.serialize()))
    return products.map((product) => product.serialize())
  }

  public async search({ request }: HttpContext) {
    const data = await request.validateUsing(searchClientValidator)

    return await Product.query().whereILike('name', `%${data.query}%`).exec()
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(productValidator)

    return await Product.create(payload)
  }

  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findProductParamsValidator)

    return await Product.query().where('id', data.params.id).firstOrFail()
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findProductParamsValidator)

    const product = await Product.findOrFail(data.params.id)
    const payload = await request.validateUsing(productValidator)

    product.merge(payload)
    await product.save()

    return product
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findProductParamsValidator)

    const product = await Product.findOrFail(data.params.id)
    await product.delete()

    return { message: 'Product deleted successfully' }
  }
}
