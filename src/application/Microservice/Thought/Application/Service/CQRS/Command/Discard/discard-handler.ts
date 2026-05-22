import { thoughtDiscardCommand } from './discard-command'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'
import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtDiscardHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async discard(thought: Thought, numberOfDiscardedThoughts: number): Promise<void> {
    try {
      const payload = {
        thought: thought,
        numberOfDiscardedThoughts: numberOfDiscardedThoughts,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Thought.discard',
        thought,
        error,
      })
      throw error
    }
  }
}

export const thoughtDiscardHandler = new ThoughtDiscardHandler(logger, thoughtDiscardCommand)
