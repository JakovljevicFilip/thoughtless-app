import { streakRebuildRule, streakRules } from './Rules/streak-rules'
import { Streak } from './Streak'
import { StreakSettings } from './StreakSettings'
import { StreakId } from './ValueObject/StreakId'

import { Aggregate } from '../../../Platform/AggregateSchema/Domain/Aggregate'

export class StreakAggregate extends Aggregate<Streak> {
  AGGREGATE_NAME = 'Streak'

  override rebuild(
    id: string,
    currentStreak: number,
    dateOfCount: string,
    countForDate: number,
    lastQualifiedDate: string | null
  ): Streak {
    const props: {
      id: unknown
      currentStreak: unknown
      dateOfCount: unknown
      countForDate: unknown
      lastQualifiedDate: unknown
    } = { id, currentStreak, dateOfCount, countForDate, lastQualifiedDate }

    streakRebuildRule.canRebuild(props)

    return new Streak(
      new StreakId(props.id),
      props.currentStreak,
      props.dateOfCount,
      props.countForDate,
      props.lastQualifiedDate
    )
  }

  static createEntity(): Streak {
    const today = streakRules.toDateKey(new Date())
    return new Streak(new StreakId(StreakSettings.streakRowId), 0, today, 0, null)
  }

  static settle(streak: Streak, now: Date): Streak {
    const today = streakRules.toDateKey(now)
    if (streak.dateOfCount === today) {
      return streak
    }

    const stillOnStreak =
      streak.lastQualifiedDate !== null &&
      streakRules.isConsecutiveDay(streak.lastQualifiedDate, today)

    const currentStreak = stillOnStreak ? streak.currentStreak : 0
    return new Streak(streak.id, currentStreak, today, 0, streak.lastQualifiedDate)
  }

  static recordDiscard(streak: Streak, discardedAt: Date): Streak {
    const settled = this.settle(streak, discardedAt)
    const today = streakRules.toDateKey(discardedAt)
    const countForDate = settled.countForDate + 1

    if (countForDate < StreakSettings.dailyGoal) {
      return new Streak(
        settled.id,
        settled.currentStreak,
        today,
        countForDate,
        settled.lastQualifiedDate
      )
    }

    if (countForDate === StreakSettings.dailyGoal) {
      return new Streak(settled.id, settled.currentStreak + 1, today, countForDate, today)
    }

    return new Streak(
      settled.id,
      settled.currentStreak,
      today,
      countForDate,
      settled.lastQualifiedDate
    )
  }
}
