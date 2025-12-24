import type { ThoughtChangePayload } from './ThoughtChangePayload'

import { ThoughtAggregate } from 'src/application/Microservice/Thought/Domain/ThoughtAggregate'
import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtChangeCommand implements Command {
  async command(payload: ThoughtChangePayload): Promise<string> {
    const changed = this.commit(payload)
    return await thoughtStorage.update(changed)
  }

  commit(payload: ThoughtChangePayload): Thought {
    return ThoughtAggregate.change(payload.thought, payload.changedContent)
  }
}

export const thoughtChangeCommand = new ThoughtChangeCommand()
