import { useStreakStore } from '../streak-store'
import { streakRecordHandler } from './CQRS/Command/Record/record-handler'
import { streakViewHandler } from './CQRS/Query/View/view-handler'
import { StreakApplicationError } from '../StreakApplicationError'

import { StreakAggregate } from '../../Domain/StreakAggregate'

import { streakStorage } from '../../Infrastructure/streak-storage'

export const streakService = {
  // COMMANDS
  async recordDiscard(discardedAt: Date): Promise<void> {
    const store = useStreakStore()
    const streak = store.streak
    if (streak === null) {
      throw new StreakApplicationError('streak store property is null.', 'service.recordDiscard')
    }
    await streakRecordHandler.record(streak, discardedAt)
    await this.load()
  },

  // QUERIES
  async load(): Promise<void> {
    const streak = await streakViewHandler.view()
    if (streak === null) {
      throw new StreakApplicationError('Streak entity is missing.', 'service.load')
    }

    const settled = StreakAggregate.settle(streak, new Date())
    if (settled.dateOfCount !== streak.dateOfCount) {
      await streakStorage.change(settled)
    }

    const store = useStreakStore()
    store.setStreak(settled)
    store.setReady(true)
  },
}
