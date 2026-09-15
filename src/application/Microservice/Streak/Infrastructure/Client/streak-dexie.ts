import type { StreakDexieORM } from './StreakDexieORM'

import type { Streak } from '../../Domain/Streak'
import type { StreakRepository } from '../../Domain/StreakRepository'
import type { StreakId } from '../../Domain/ValueObject/StreakId'
import { StreakAggregate } from '../../Domain/StreakAggregate'

import type { DexieRepository } from 'src/application/Platform/Storage/Dexie/Domain/DexieRepository'

export class StreakDexie implements StreakRepository {
  constructor(private readonly client: DexieRepository) {}

  async findOneById(id: StreakId): Promise<Streak | null> {
    const row = (await this.client.findOneById(id.toString())) as StreakDexieORM | null
    if (row === null) {
      return null
    }

    const aggregate = new StreakAggregate()
    return aggregate.rebuild(
      row.id,
      row.current_streak,
      row.date_of_count,
      row.count_for_date,
      row.last_qualified_date
    )
  }

  async change(streak: Streak): Promise<string> {
    const orm = {
      id: streak.id.toString(),
      current_streak: streak.currentStreak,
      date_of_count: streak.dateOfCount,
      count_for_date: streak.countForDate,
      last_qualified_date: streak.lastQualifiedDate,
    }

    return await this.client.update(orm)
  }

  async createEntity(streak: Streak): Promise<string> {
    const orm = {
      id: streak.id.toString(),
      current_streak: streak.currentStreak,
      date_of_count: streak.dateOfCount,
      count_for_date: streak.countForDate,
      last_qualified_date: streak.lastQualifiedDate,
    }

    return await this.client.create(orm)
  }
}
