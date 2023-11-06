import knex from 'knex'

export const database = knex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
})
