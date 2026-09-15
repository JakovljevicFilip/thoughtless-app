import { streakViewQuery } from './view-query'

import type { Streak } from 'src/application/Microservice/Streak/Domain/Streak'
import { StreakId } from 'src/application/Microservice/Streak/Domain/ValueObject/StreakId'
import { StreakSettings } from 'src/application/Microservice/Streak/Domain/StreakSettings'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { View } from 'src/application/Platform/Service/Domain/CQRS/Query/View'

class ViewQueryHandler {
  private readonly log: LogAdapter
  private readonly query: View<StreakId, Streak>

  constructor(log: LogAdapter, query: View<StreakId, Streak>) {
    this.log = log
    this.query = query
  }

  async view(): Promise<Streak | null> {
    try {
      const id = new StreakId(StreakSettings.streakRowId)
      return await this.query.view(id)
    } catch (error) {
      this.log.write({
        context: 'query.view',
        error,
      })
      throw error
    }
  }
}

export const streakViewHandler = new ViewQueryHandler(logger, streakViewQuery)
