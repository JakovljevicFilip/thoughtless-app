import type { ThoughtRestorePayload } from './ThoughtRestorePayload'
import { thoughtRestoreCommand } from './restore-command'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtRestoreHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async restore(thought: Thought, numberOfActiveThoughts: number): Promise<void> {
    try {
      const payload = <ThoughtRestorePayload>{
        thought: thought,
        numberOfActiveThoughts: numberOfActiveThoughts,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Thought.restore',
        thought,
        error,
      })
      throw error
    }
  }
}

export const thoughtRestoreHandler = new ThoughtRestoreHandler(logger, thoughtRestoreCommand)
