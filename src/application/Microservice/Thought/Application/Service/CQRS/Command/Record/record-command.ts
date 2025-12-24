import type { ThoughtRecordPayload } from './ThoughtRecordPayload'

import { ThoughtAggregate } from 'src/application/Microservice/Thought/Domain/ThoughtAggregate'
import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class ThoughtRecordCommand implements Command {
  async command(payload: ThoughtRecordPayload): Promise<string> {
    const recorded = this.commit(payload)
    return await thoughtStorage.save(recorded)
  }

  commit(payload: ThoughtRecordPayload): Thought {
    return ThoughtAggregate.record(payload.content, payload.numberOfActiveThoughts)
  }
}

export const thoughtRecordCommand = new ThoughtRecordCommand()
