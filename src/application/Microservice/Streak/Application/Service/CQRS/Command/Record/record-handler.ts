import { streakRecordCommand } from './record-command'

import type { Streak } from 'src/application/Microservice/Streak/Domain/Streak'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class RecordHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async record(streak: Streak, discardedAt: Date): Promise<void> {
    try {
      const payload = { streak: streak, discardedAt: discardedAt }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'command.record',
        streak,
        error,
      })
      throw error
    }
  }
}

export const streakRecordHandler = new RecordHandler(logger, streakRecordCommand)
