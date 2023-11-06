import fastify from 'fastify'
import { setupKnex } from './database'
import { env } from '../env'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await setupKnex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app.listen({ port: env.PORT }, () =>
  console.log(`http://localhost:${env.PORT}`),
)
