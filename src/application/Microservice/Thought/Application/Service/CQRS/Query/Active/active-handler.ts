import { thoughtListActiveQuery } from './active-query'
import { activeFilter, type ActiveFilter } from './active-filter'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

class ActiveQueryHandler {
  private readonly log: LogAdapter
  private readonly query: List<Thought>
  private readonly filter: ActiveFilter

  constructor(log: LogAdapter, query: List<Thought>, filter: ActiveFilter) {
    this.log = log
    this.query = query
    this.filter = filter
  }

  async listActive(): Promise<Thought[]> {
    try {
      const active = await this.query.list()
      return this.filter.filter(active)
    } catch (error) {
      this.log.write({
        context: 'Thought.listActive',
        error,
      })
      throw error
    }
  }
}

export const thoughtListActiveHandler = new ActiveQueryHandler(
  logger,
  thoughtListActiveQuery,
  activeFilter
)
