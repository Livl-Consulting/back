// SupplierPaymentsController

import SupplierPayment from '#models/supplier_payment'
import PurchaseOrder from '#models/purchase_order'
import { HttpContext } from '@adonisjs/core/http'
import { createSupplierPaymentValidator, findSupplierPaymentParamsValidator, updateSupplierPaymentValidator } from '../validators/supplier_payment.js'

export default class SupplierPaymentsController {
  // Index pour récupérer tous les paiements
  public async index({ }: HttpContext) {
    const payments = await SupplierPayment.query().preload('purchaseOrder')
    return payments.map((payment) => payment.serialize())
  }

  // Store pour créer un paiement
  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createSupplierPaymentValidator)

    // Vérification de l'existence de la commande
    const purchaseOrder = await PurchaseOrder.findOrFail(payload.purchaseOrderId)
    await purchaseOrder.load('products')

    // Si tu veux mettre à jour le statut de la commande en fonction du paiement (ex: si payé entièrement)
    var totalAmountToPay = 0
    purchaseOrder.products.forEach((product) => {
        totalAmountToPay += product.$extras.pivot_quantity * product.$extras.pivot_unit_price
    })

    // Calcul du montant total déjà payé
    const supplierPayment = await SupplierPayment.query()
        .where('purchase_order_id', payload.purchaseOrderId)

    var totalAmountPaid = 0
    supplierPayment.forEach((payment) => {
        totalAmountPaid += payment.amount
    })

    const remainingAmount = totalAmountToPay - totalAmountPaid

    // Vérification si le montant payé ne dépasse pas le montant restant
    if (payload.amount > remainingAmount) {
      throw new Error('Le montant payé dépasse le montant restant à payer')
    }

    // Créer un paiement
    const payment = await SupplierPayment.create({
        purchaseOrderId: payload.purchaseOrderId,
        amount: payload.amount,
        paymentMethod: payload.paymentMethod,
        notes: payload.notes,
        paymentDate: payload.paymentDate,
        supplierId: payload.supplierId,
      })

    // Vérification si le montant total payé correspond au montant total de la commande
    const updatedTotalPaid = totalAmountPaid + payload.amount
    if (updatedTotalPaid === totalAmountToPay) {
      // Si le montant total payé est égal au montant total de la commande, on met à jour le statut
      purchaseOrder.status = 'invoiced'
      await purchaseOrder.save()
    }

    await payment.load('purchaseOrder')

    return payment.serialize()
  }

  // Show pour récupérer un paiement spécifique
  public async show({ request }: HttpContext) {
    const data = await request.validateUsing(findSupplierPaymentParamsValidator)

    const payment = await SupplierPayment.query()
      .where('id', data.params.id)
      .preload('purchaseOrder')
      .firstOrFail()

    return payment.serialize()
  }

  // Update pour modifier un paiement existant
  public async update({ request }: HttpContext) {
    const payload = await request.validateUsing(updateSupplierPaymentValidator)
    const data = await request.validateUsing(findSupplierPaymentParamsValidator)
    
    const payment = await SupplierPayment.findOrFail(data.params.id)

    payment.merge(payload)
    await payment.save()

    return payment.serialize()
  }

  // Destroy pour supprimer un paiement
  public async destroy({ params }: HttpContext) {
    const payment = await SupplierPayment.findOrFail(params.id)
    await payment.delete()

    return { message: 'Supplier payment deleted successfully' }
  }
}
