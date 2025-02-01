// import type { HttpContext } from '@adonisjs/core/http'
// @ts-nocheck: TODO Argument of type '"order"' is not assignable to parameter of type 'ExtractModelRelations<ClientPayment>'.

import { HttpContext } from '@adonisjs/core/http'
import { createClientPaymentValidator, findClientPaymentParamsValidator, updateClientPaymentValidator } from '../validators/client_payments.js'
import ClientPayment from '#models/client_payment'
import Order from '#models/order'

export default class ClientPaymentsController {
  // Index pour récupérer tous les paiements
  public async index({ }: HttpContext) {
    const payments = await ClientPayment.query().preload('order')
    return payments.map((payment) => payment.serialize())
  }

  // Store pour créer un paiement
  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createClientPaymentValidator)

    // Vérification de l'existence de la commande
    const order = await Order.findOrFail(payload.orderId)
    await order.load('product')

    // Si tu veux mettre à jour le statut de la commande en fonction du paiement (ex: si payé entièrement)
    var totalAmountToPay = order.product.price

    // Calcul du montant total déjà payé
    const clientPayment = await ClientPayment.query()
        .where('order_id', payload.orderId)

    var totalAmountPaid = 0
    clientPayment.forEach((payment) => {
        totalAmountPaid += payment.amount
    })

    const remainingAmount = totalAmountToPay - totalAmountPaid

    // Vérification si le montant payé ne dépasse pas le montant restant
    if (payload.amount > remainingAmount) {
      throw new Error('Le montant payé dépasse le montant restant à payer')
    }

    // Créer un paiement
    const payment = await ClientPayment.create({
        orderId: order.id,
        amount: payload.amount,
        paymentMethod: payload.paymentMethod,
        notes: payload.notes,
        paymentDate: payload.paymentDate,
        clientId: order.clientId,
      })

    // Vérification si le montant total payé correspond au montant total de la commande
    const updatedTotalPaid = totalAmountPaid + payload.amount
    if (updatedTotalPaid === totalAmountToPay) {
      // Si le montant total payé est égal au montant total de la commande, on met à jour le statut
      order.status = 'invoiced'
      await order.save()
    }

    await payment.load('order')

    return payment.serialize()
  }

  // Show pour récupérer un paiement spécifique
  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findClientPaymentParamsValidator)

    const payment = await ClientPayment.query()
      .where('id', data.params.id)
      .preload('order')
      .firstOrFail()

    return payment.serialize()
  }

  public async showFromSaleOrder({ request }: HttpContext) {
    const data = await request.validateUsing(findClientPaymentParamsValidator)

    const payments = await ClientPayment.query()
      .where('order_id', data.params.id)
      .preload('order')
      .exec()

    return payments.map((payment) => payment.serialize())
  }

  // Update pour modifier un paiement existant
  public async update({ request }: HttpContext) {
    const payload = await request.validateUsing(updateClientPaymentValidator)
    const data = await request.validateUsing(findClientPaymentParamsValidator)
    
    const payment = await ClientPayment.findOrFail(data.params.id)

    payment.merge(payload)
    await payment.save()

    return payment.serialize()
  }

  // Destroy pour supprimer un paiement
  public async destroy({ params }: HttpContext) {
    const payment = await ClientPayment.findOrFail(params.id)
    await payment.delete()

    return { message: 'Client payment deleted successfully' }
  }
}
