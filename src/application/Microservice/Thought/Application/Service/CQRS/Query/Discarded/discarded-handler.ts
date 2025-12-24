import { thoughtListDiscardedQuery } from './discarded-query'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

class DiscardedQueryHandler {
  private readonly log: LogAdapter
  private readonly query: List<Thought>

  constructor(log: LogAdapter, query: List<Thought>) {
    this.log = log
    this.query = query
  }

  async listDiscarded(): Promise<Thought[]> {
    try {
      return await this.query.list()
    } catch (error) {
      this.log.write({
        context: 'Thought.listDiscarded',
        error,
      })
      throw error
    }
  }
}

export const thoughtListDiscardedHandler = new DiscardedQueryHandler(
  logger,
  thoughtListDiscardedQuery
)
