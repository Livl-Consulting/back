import Order from '#models/order'
import { createOrderValidator, findOrderParamsValidator } from '#validators/order'
import type { HttpContext } from '@adonisjs/core/http'
import Product from '../models/product.js'
import Puppeteer from 'puppeteer';

export default class OrdersController {
    public async index({}: HttpContext) {
        const orders = await Order.query().preload('client').preload('product')
 
        return orders.map((order) => order.serialize())
    }

    public async store({ request }: HttpContext) {
        const payload = await request.validateUsing(createOrderValidator)

        // check if Order with quoteId already exists(if quoteId is provided)
        if (payload.quoteId) {
            const existingOrder = await Order.findBy('quoteId', payload.quoteId)
            if (existingOrder) {
                throw new Error('Order already exists')
            }
        }

        // Check if product type is 'sale'
        const product = await Product.findOrFail(payload.productId)
        if (product.type == 'purchase') {
            throw new Error('You can only create opportunities for sale products')
        }

        const order = await Order.create(payload)
        const refreshedOrder = await order.refresh()
        return refreshedOrder.serialize()
    }

    public async show({ request }: HttpContext) {
        const data = await request.validateUsing(findOrderParamsValidator)

        return await Order.query().where('id', data.params.id).preload('client').firstOrFail()
    }

    public async update({ request }: HttpContext) {
        const data = await request.validateUsing(findOrderParamsValidator)

        const order = await Order.findOrFail(data.params.id)

        if(order.status !== 'progress') {
            throw new Error('You cannot update a validated or cancelled order')
        }

        const payload = await request.validateUsing(createOrderValidator)

        order.merge(payload)
        await order.save()

        return order
    }

    public async generatePdf({ params, response, view }: HttpContext) {
        try {
            // Récupérer la commande avec le client et le produit associés
            const order = await Order.query()
                .where('id', params.id)
                .preload('client')
                .preload('product')
                .firstOrFail();

            // Générer le HTML en utilisant le template EdgeJS
            const html = await view.render('order_confirmation', {
                order,
                client: order.client,
                product: order.product,
            });

            // Lancer Puppeteer pour générer le PDF
            const browser = await Puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });

            // Générer le PDF
            const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

            await browser.close();

            const buffer = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);

            // Envoyer le PDF en réponse
            response.header('Content-Type', 'application/pdf');
            response.header('Content-Disposition', `attachment; filename="confirmation_commande_${order.id}.pdf"`);
            return response.send(buffer);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF :', error);
            return response.status(500).send('Une erreur est survenue lors de la génération du PDF.');
        }
    }

    public async destroy({ request }: HttpContext) {
        const data = await request.validateUsing(findOrderParamsValidator)

        const order = await Order.findOrFail(data.params.id)

        order.status = 'cancelled'
        await order.save()

        return { message: 'Order set to cancelled' }
    }
}