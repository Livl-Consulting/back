# Livl Consulting - Sales/Purchase flow

## Installation

- Clone the `Adonis.JS` API project
- Run the command `npm i`
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

## Products

- You can create a product with a `POST` Request on the route `/api/products`
```json
{
    "name": "Project Management",
    "price": 1000,
    "description": "Product Gestion de Projet description"
}
```

## Clients

- You can create a client with a `POST` Request on the route `/api/clients`
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Livl Consulting", // Optional
    "email": "john.doe@livl.fr" // Must be unique
}
```

## Sales flow

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

# Quotes

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
