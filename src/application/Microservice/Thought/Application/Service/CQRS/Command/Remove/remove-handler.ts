import { thoughtRemoveCommand } from './remove-command'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtRemoveHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async remove(thought: Thought): Promise<void> {
    try {
      const payload = {
        thought: thought,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Thought.remove',
        error,
      })
      throw error
    }
  }
}

export const thoughtRemoveHandler = new ThoughtRemoveHandler(logger, thoughtRemoveCommand)
