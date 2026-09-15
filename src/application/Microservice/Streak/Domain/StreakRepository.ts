import type { Streak } from './Streak'
import type { StreakId } from './ValueObject/StreakId'

import type { AggregateRepository } from 'src/application/Platform/AggregateSchema/Domain/AggregateRepository'

export interface StreakRepository extends AggregateRepository {
  change(streak: Streak): Promise<string>
  createEntity(streak: Streak): Promise<string>
  findOneById(id: StreakId): Promise<Streak | null>
}
