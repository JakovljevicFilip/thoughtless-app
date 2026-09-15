import type { StreakRecordPayload } from './StreakRecordPayload'

import { StreakAggregate } from 'src/application/Microservice/Streak/Domain/StreakAggregate'
import type { Streak } from 'src/application/Microservice/Streak/Domain/Streak'

import { streakStorage } from 'src/application/Microservice/Streak/Infrastructure/streak-storage'

import type { Command } from 'src/application/Platform/Service/Domain/CQRS/Command/Command'

class StreakRecordCommand implements Command {
  async command(payload: StreakRecordPayload): Promise<string> {
    const recorded = this.commit(payload)
    return await streakStorage.change(recorded)
  }

  commit(payload: StreakRecordPayload): Streak {
    return StreakAggregate.recordDiscard(payload.streak, payload.discardedAt)
  }
}

export const streakRecordCommand = new StreakRecordCommand()
