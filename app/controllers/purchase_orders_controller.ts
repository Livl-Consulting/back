import PurchaseOrder from '#models/purchase_order'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { createPurchaseOrderValidator, findPurchaseOrderParamsValidator, updatePurchaseOrderValidator } from '../validators/purchase_order.js'
import Puppeteer from 'puppeteer';

export default class PurchaseOrdersController {
  public async index({}: HttpContext) {
    const purchaseOrders = await PurchaseOrder.query().preload('products').preload('supplier').preload('supplierPayments')
    return purchaseOrders.map((order) => order.serialize())
  }

  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createPurchaseOrderValidator)

    const productPayload: Record<number, { quantity: number; unit_price: number }> = {}

    var totalAmount = 0
    for (const product of payload.products) {
      const retrievedProduct = await Product.findOrFail(product.id)
      if (retrievedProduct.type == 'sale') {
        throw new Error('Product is not purchasable, product type must be "both" or "purchase"')
      }
      productPayload[product.id] = { quantity: product.quantity, unit_price: product.unit_price }
      totalAmount += product.quantity * product.unit_price
    }

    const purchaseOrder = await PurchaseOrder.create({
      supplierId: payload.supplierId,
      status: 'progress',
      totalAmount: totalAmount,
    })

    await purchaseOrder.related('products').attach(productPayload)
    await purchaseOrder.load('products')
    await purchaseOrder.load('supplier')

    return purchaseOrder.serialize()
  }

  public async update({ request }: HttpContext) {
    const data = await request.validateUsing(findPurchaseOrderParamsValidator)
    const payload = await request.validateUsing(updatePurchaseOrderValidator)

    const purchaseOrder = await PurchaseOrder.findOrFail(data.params.id)
    purchaseOrder.merge(payload)
    await purchaseOrder.save()

    return purchaseOrder.serialize()
  }

  public async show({ request }: HttpContext) {
    const { params } = await request.validateUsing(findPurchaseOrderParamsValidator)

    const purchaseOrder = await PurchaseOrder.query()
      .where('id', params.id)
      .preload('products')
      .preload('supplier')
      .preload('supplierPayments')
      .firstOrFail()

    return purchaseOrder.serialize()
  }

  public async generatePdf({ params, response, view }: HttpContext) {
    try {
      const purchaseOrder = await PurchaseOrder.query()
        .where('id', params.id)
        .preload('supplier')
        .preload('products')
        .firstOrFail();
  
      const total = purchaseOrder.totalAmount;
      // const total = purchaseOrder.products.reduce((total, product) => {
      //   return total + product.$extras.pivot_quantity * product.$extras.pivot_unit_price;
      // }, 0);
  
      const html = await view.render('purchase_order', {
        purchaseOrder,
        supplier: purchaseOrder.supplier,
        products: purchaseOrder.products,
        total,
      });
  
      const browser = await Puppeteer.launch({
        executablePath: Puppeteer.executablePath(),
        args: [
          '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-gpu',
        ],
      });

      const page = await browser.newPage();
      await page.setBypassCSP(true); // useless i think 
  
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, 
        path: `bon_de_commande_achat.pdf` });

      await browser.close();

      const buffer = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);

      response.header('Content-Type', 'application/pdf');
      response.header('Content-Disposition', `inline`); // to just display
      // response.header('Content-Disposition', `attachment; filename="bon_de_commande_achat.pdf"`); // to download
      return response.send(buffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      return response.status(500).send('An error occurred while generating the PDF.');
    }
  }

  public async destroy({ request }: HttpContext) {
    const data = await request.validateUsing(findPurchaseOrderParamsValidator)

    const purchaseOrder = await PurchaseOrder.findOrFail(data.params.id)
    purchaseOrder.status = 'cancelled'
    await purchaseOrder.save()

    return { message: 'Purchase order cancelled' }
  }
}
