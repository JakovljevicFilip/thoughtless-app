import type { ThoughtAlterPayload } from './ThoughtAlterPayload'
import { thoughtAlterCommand } from './alter-command'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class AlterHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async alter(thought: Thought, alteredContent: string): Promise<void> {
    try {
      const payload = <ThoughtAlterPayload>{
        thought: thought,
        alteredContent: alteredContent,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Thought.alter',
        thought,
        error,
      })
      throw error
    }
  }
}

export const thoughtAlterHandler = new AlterHandler(logger, thoughtAlterCommand)
