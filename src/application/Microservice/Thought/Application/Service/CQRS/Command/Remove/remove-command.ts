import type { ThoughtRemovePayload } from './ThoughtRemovePayload'

import { ThoughtAggregate } from 'src/application/Microservice/Thought/Domain/ThoughtAggregate'
import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtRemoveCommand implements Command {
  async command(payload: ThoughtRemovePayload): Promise<string> {
    const removed = this.commit(payload)
    return await thoughtStorage.remove(removed)
  }

  commit(payload: ThoughtRemovePayload): Thought {
    return ThoughtAggregate.remove(payload.thought)
  }
}

export const thoughtRemoveCommand = new ThoughtRemoveCommand()
