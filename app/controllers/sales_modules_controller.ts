// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";
import Opportunity from "../models/opportunity.js";
import Order from "../models/order.js";
import Quote from "../models/quote.js";

export default class SalesModulesController {

    public async index({}: HttpContext) {
        // Récupérer les opportunités avec le client et le produit associés
        const opportunities = await Opportunity.query()
        .preload('client')
        .preload('product')
    
        // Récupérer les devis avec le client et le produit associés
        const quotes = await Quote.query()
        .preload('client')
        .preload('product')
    
        // Récupérer les commandes avec le client et le produit associés
        const orders = await Order.query()
        .preload('client')
        .preload('product')
    
        // Combiner les données dans un format unifié
        const salesData = [
        ...opportunities.map((opportunity) => ({
            type: 'Opportunity',
            idType: opportunity.id,
            client: `${opportunity.client.firstName} ${opportunity.client.lastName} (${opportunity.client.companyName})`,
            product: opportunity.product.name,
            amount: opportunity.price,
            date: opportunity.createdAt,
            status: opportunity.status,
            probability: `${opportunity.successProbability}%`,
        })),
        ...quotes.map((quote) => ({
            type: 'Quote',
            idType: quote.id,
            client: `${quote.client.firstName} ${quote.client.lastName} (${quote.client.companyName})`,
            product: quote.product.name,
            amount: quote.price,
            date: quote.createdAt,
            status: quote.status,
            probability: `${quote.successProbability}%`,
        })),
        ...orders.map((order) => ({
            type: 'Order',
            idType: order.id,
            client: `${order.client.firstName} ${order.client.lastName} (${order.client.companyName})`,
            product: order.product.name,
            amount: order.price,
            date: order.createdAt,
            status: order.status,
            probability: 'N/A', // Non applicable pour les commandes
        })),
        ]
    
        return salesData
    }
}