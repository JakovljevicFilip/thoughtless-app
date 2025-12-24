import type { ThoughtRestorePayload } from './ThoughtRestorePayload'

import { ThoughtAggregate } from 'src/application/Microservice/Thought/Domain/ThoughtAggregate'
import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtRestoreCommand implements Command {
  async command(payload: ThoughtRestorePayload): Promise<string> {
    const restore = this.commit(payload)
    return await thoughtStorage.update(restore)
  }

  commit(payload: ThoughtRestorePayload): Thought {
    return ThoughtAggregate.restore(payload.thought, payload.numberOfActiveThoughts)
  }
}

export const thoughtRestoreCommand = new ThoughtRestoreCommand()
