# Livl Consulting - Sales/Purchase flow

## Installation

- Clone the `Adonis.JS` API project
- Run the command `pnpm i`
- Copy and paste the keys from the `.env.example` in a new file `env` and change the values as you wish
- Run the project in dev mode with `node ace serve`

### Setup development database

- Start the Docker app
- Go in the folder `cd postgres-compose`
- Run the command `docker-compose up -d`
- Go back to the root project and run `node ace migration:run`

> You can change the different env variables in the compose but do not forget to change your `.env` file as well.

### Make a migration

- Run the command `node ace make:migration <migration_name>`
- Run the command `node ace migration:run`

> You can also run the command `node ace migration:fresh --seed` to reset the database and seed it with the default data.

## Documentation

- The Swagger API documentation is disponible at the link `/docs` route.

### Products

- You can create a product with a `POST` Request on the route `/api/products`
```json
{
    "name": "Project Management",
    "price": 1000,
    "description": "Product Gestion de Projet description"
    "type": 'both' | 'purchase' | 'sales'
}
```

### Clients & Suppliers 

- You can create a client/supplier with a `POST` Request on the route `/api/clients` or `/api/suppliers`

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Livl Consulting", // Optional
    "email": "john.doe@livl.fr" // Must be unique
}
```

When you get a supplier you have the following response :

```json
{
    "id": 3,
    "createdAt": "2025-01-27T20:08:26.543+00:00",
    "updatedAt": "2025-01-27T20:08:26.543+00:00",
    "firstName": "fournisseur3",
    "lastName": "fournisseur3",
    "companyName": null,
    "email": "fournisseur3.last@gmail.com",
    "priceRequests": [],
    "supplierPayments": [],
    "purchaseOrders": []
}
```

And when you get a client you have the following response :

```json
{
    "id": 3,
    "createdAt": "2025-01-27T20:10:20.188+00:00",
    "updatedAt": "2025-01-27T20:10:20.188+00:00",
    "firstName": "firstName",
    "lastName": "lastName",
    "companyName": null,
    "email": "firstsss.last2@gmail.com",
    "quotes": [],
    "opportunities": [],
    "orders": []
}
```

## Sales flow

### Generic backlog route

- You can get all the opportunities, quotes and orders with a `GET` Request on the route `/api/sales-backlog`

### Opportunities

A sales opportunity is basically at the really beginning when you want to propose an opportunity to a client from specific products that he could be interested.

- You need to create a client first to get its id on the `api/clients` route
- Then on the route `/api/opportunities` make a `POST` Request to create an opportunity
```json
{
    "successProbability": "60",
    "price": 1000,
    "productId": 1,
    "clientId": 1
    // "status": "progress", no need to set it, it will be set to "progress" by default
}
```
- If you want to delete an opportunity, you can make a `DELETE` Request on the route `/api/opportunities/:id`, it will not delete it in the database, it will set its status to "cancelled"
- On the route `/api/opportunities/quote/:id` you can make a `POST` Request to create a quote from an opportunity : this will create a quote with the same values as the opportunities, except the status of the created quote will be `progress` and the status of the opportunity will be `validated`
- The opportunity cannot be updated if status is set to `validated` or `cancelled`

### Quotes

- You can either create a quote from an opportunity or manually from the route `/api/quotes` with a `POST` Request.
```json
{
    "successProbability": "12",
    "price": 10000,
    "productId": 1,
    "clientId": 1,
    "opportunityId": 1 // Optional, so can be null but must be unique if used
    // "status": "progress", no need to set it, it will be set to "progress" by default
}
```
- You can only create a quote from ONE opportunity, if you try to create a quote with an opportunity that already exists in the `Quotes` table, it will return an error.
- If a quote is deleted, it will set its status to `cancelled`
- The quote cannot be updated if status is set to `validated` or `cancelled`

### Order 

Same as the previous ones, to make an order just give the quote id, the product id and the client id and the status will be set to `progress` by default.

```json
{
    "quoteId": 1,
    "clientId": 1,
    "productId": 1,
    "price": 10000,
    "status": "progress" // Optional, will be set to "progress" by default
}
```

### Client payment

After the order, you can make a client payment with a `POST` Request on the route `/api/client-payments`. Select one order, the payment method and its amount.

```json
{
  "orderId": 1,
  // "clientId": 1, no need to set it, it will be set automatically because of the order
  "amount": 1, 
  "paymentMethod": "bank_transfer", // 'cash' | 'check' | 'credit_card' | 'bank_transfer' | 'paypal' | 'other'
  "notes": "Payment 2",
  "paymentDate": "2025-01-27T17:09:47"
}
```

### PDF Order generation

You can print a PDF of an order with a `GET` Request on the route `/api/orders/generate-pdf/:id/`. It will generate a PDF with the order details, with the client, the product, the total amount.

## Purchase flow

### Price request

You can make a price request with a `POST` Request on the route `/api/price-requests`. Select one supplier (not client), and a product with a quantity and a unit price.

```json
{
  "supplierId": 1,
  "status": "progress", // Optional, will be set to "progress" by default
  "products": [
    {
      "id": 1,
      "quantity": 10,
      "unit_price": 2000
    }
  ]
}
```

> The product must have the type 'both' or 'purchase' to be able to make a price request. It is not possible to make a price request with a product with the type 'sales', otherwise it would lead to an error.

When you make a GET request on the route `/api/price-requests`, you will see a column named `meta` that contains the pivot table, have a look here :
```json
{
    "id": 2,
    "supplierId": 1,
    "status": "progress",
    "supplier": {
        "id": 1,
        ...
    },
    "products": [
        {
            "id": 1,
            ...
            "type": "both",
            "meta": {
                "pivot_price_request_id": 2,
                "pivot_product_id": 1,
                "pivot_quantity": 10,
                "pivot_unit_price": "2000.00",
                "pivot_created_at": "2025-01-27T14:37:59.195+00:00",
                "pivot_updated_at": "2025-01-27T14:37:59.195+00:00"
            }
        }
    ]
}
```

- You can also create an order from the price request, just make a `POST` Request on the route `/api/price-requests/order/:id` with the id of the price request. It will create an order with the same values as the price request, except the status of the created order will be `progress` and the status of the price request will be `validated`. It will automatically create the order with all the products (quantity and price) of the price request.

### Purchase order

You can make a purchase order with a `POST` Request on the route `/api/purchase-orders`. Select one supplier (not client), and a product with a quantity and a unit price. It is the same as the price request

```json
{
  "supplierId": 1,
  "totalAmount": 20000, // Optional, will be calculated automatically
  "products": [
    {
      "id": 1,
      "quantity": 10,
      "unit_price": 2000
    }
  ]
}
```

As before, when you GET a purchase order, for each product, you will have the column `meta` that contains the pivot table.

> The total amount is calculated by the sum of the quantity multiplied by the unit price for each product.

### Supplier payment

After the purchase order, you can make a supplier payment with a `POST` Request on the route `/api/supplier-payments`. Select one purchase order,the payment method and its amount.

```json
{
  "purchaseOrderId": 1,
  // "supplierId": 1, no need to set it, it will be set automatically because of the purchase order
  "amount": 1, 
  "paymentMethod": "bank_transfer", // 'cash' | 'check' | 'credit_card' | 'bank_transfer' | 'paypal' | 'other'
  "notes": "Payment 2",
  "paymentDate": "2025-01-27T17:09:47"
}
```

> Be careful, you can make as many payments as you want for a purchase order, but the sum of all payments must be equal to the total amount of the purchase order. If one payment is greater than the total amount, it will return an error. 

> A purchase order status is set to 'invoice' when the sum of all payments is equal to the total amount.

### PDF Order generation

You can print a PDF of an order with a `GET` Request on the route `/api/purchase-orders/generate-pdf/:id/`. It will generate a PDF with the order details, with the supplier, the products, the total amount.