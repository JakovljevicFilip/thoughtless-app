import type { StreakId } from './ValueObject/StreakId'

import type { AggregateEntity } from '../../../Platform/AggregateSchema/Domain/AggregateEntity'

export class Streak implements AggregateEntity {
  constructor(
    public readonly id: StreakId,
    public readonly currentStreak: number,
    public readonly dateOfCount: string,
    public readonly countForDate: number,
    public readonly lastQualifiedDate: string | null
  ) {}
}
