import type { ThoughtAlterPayload } from './ThoughtAlterPayload'

import { ThoughtAggregate } from 'src/application/Microservice/Thought/Domain/ThoughtAggregate'
import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtAlterCommand implements Command {
  async command(payload: ThoughtAlterPayload): Promise<string> {
    const changed = this.commit(payload)
    return await thoughtStorage.update(changed)
  }

  commit(payload: ThoughtAlterPayload): Thought {
    return ThoughtAggregate.alter(payload.thought, payload.alteredContent)
  }
}

export const thoughtAlterCommand = new ThoughtAlterCommand()
