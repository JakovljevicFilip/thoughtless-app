import type { ThoughtChangePayload } from './ThoughtChangePayload'
import { thoughtChangeCommand } from './change-command'

import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { logger } from 'src/application/Platform/Log/Application/log-service'
import type { LogAdapter } from 'src/application/Platform/Log/Domain/Log'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ChangeHandler {
  private readonly log: LogAdapter
  private readonly command: Command

  constructor(log: LogAdapter, command: Command) {
    this.log = log
    this.command = command
  }

  async change(thought: Thought, changedContent: string): Promise<void> {
    try {
      const payload = <ThoughtChangePayload>{
        thought: thought,
        changedContent: changedContent,
      }
      await this.command.command(payload)
    } catch (error) {
      this.log.write({
        context: 'Thought.change',
        thought,
        error,
      })
      throw error
    }
  }
}

export const thoughtChangeHandler = new ChangeHandler(logger, thoughtChangeCommand)
