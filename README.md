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

## Documentation

- The Swagger API documentation is disponible at the link `/docs` route.

## Sales flow

### Sales opportunities

A sales opportunity is basically at the really beginning when you want to propose an opportunity to a client from specific products that he could be interested.

- You need to create a client first to get its id on the `api/clients` route
- Then on the route `/api/opportunities` make a `POST` Request to create an opportunity
