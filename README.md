# Financial Transactions Management

A simple CRUD project in Node, Express, Typescript, TypeORM, PostgreSQL etc. Creation of financial transactions, transactions and balance listing, transaction removal and csv file upload to import transaction data and store in the database.

### Prerequisites

Node.js, PostgreSQL and a package manager like npm or yarn.

### Installing

Run `npm install` or `yarn` to install all the dependencies.
Run `npm run dev` or `yarn dev:server` to run the server.

## Getting Started

The following endpoints can be tested with this server:

To list transactions:
    GET http://localhost:3333/transactions

To create a transaction (the body receives title (string), value (number), type ('income' | 'outcome') and category (string)):
    POST http://localhost:3333/transactions

To delete a transaction:
    DELETE http://localhost:3333/transactions/:id

To upload a csv file with transaction data (csv columns order: title, type, value, category. Form-data field name: 'file'):
    POST http://localhost:3333/transactions/import

## Running the tests

Run `npm test` or `yarn test` to run all the automated tests.
