import type { ThoughtDiscardPayload } from './ThoughtDiscardPayload'

import { ThoughtAggregate } from 'src/application/Microservice/Thought/Domain/ThoughtAggregate'
import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtDiscardCommand implements Command {
  async command(payload: ThoughtDiscardPayload): Promise<string> {
    const created = this.commit(payload)
    return await thoughtStorage.update(created)
  }

  commit(payload: ThoughtDiscardPayload): Thought {
    return ThoughtAggregate.discard(payload.thought, payload.numberOfDiscardedThoughts)
  }
}

export const thoughtDiscardCommand = new ThoughtDiscardCommand()
