# Rest_API_Fastify_TS

REST API built with Fastify, Knex, and TypeScript and other tools.

## API Endpoints

- `GET /api/transactions`: Retrieve all transactions for the current session.

- `GET /api/transactions/:id`: Retrieve a transaction by its ID for the current session.

- `GET /api/transactions/summary`: Retrieve a summary of all transactions for the current session.

- `POST /api/transactions`: Create a new transaction.

  Requires the following JSON payload:
  ```json
  {
    "title": "Transaction Title",
    "amount": 50,
    "type": "credit"
  }
