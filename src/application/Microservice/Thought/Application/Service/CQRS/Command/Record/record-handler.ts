import type { ThoughtRecordPayload } from './ThoughtRecordPayload'
import { thoughtRecordCommand } from './record-command'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtRecordHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async record(content: string, numberOfActiveThoughts: number): Promise<void> {
    try {
      const payload = <ThoughtRecordPayload>{
        content: content,
        numberOfActiveThoughts: numberOfActiveThoughts,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Thought.record',
        error,
      })
      throw error
    }
  }
}

export const thoughtRecordHandler = new ThoughtRecordHandler(logger, thoughtRecordCommand)
