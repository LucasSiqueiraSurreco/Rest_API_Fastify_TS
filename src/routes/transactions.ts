import { FastifyInstance } from 'fastify'
import { setupKnex } from '../database'
import { z } from 'zod'
import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await setupKnex('transactions').select()
    return { transactions }
  })

  app.get('/:id', async (req) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(req.params)

    const transaction = await setupKnex('transactions').where('id', id).first()
    return { transaction }
  })

  app.get('/summary', async () => {
    const summary = await setupKnex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.post('/', async (req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId
    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await setupKnex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
