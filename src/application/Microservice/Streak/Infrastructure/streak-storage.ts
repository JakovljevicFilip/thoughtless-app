import { StreakDexie } from './Client/streak-dexie'

import type { StreakRepository } from '../Domain/StreakRepository'
import type { Streak } from '../Domain/Streak'
import type { StreakId } from '../Domain/ValueObject/StreakId'

import { StorageMaker } from 'src/application/Platform/Storage/_Storage/Infrastructure/storage-maker'

class StreakStorage implements StreakRepository {
  private readonly repo: StreakRepository

  constructor() {
    const client = StorageMaker.make('Streak')
    this.repo = new StreakDexie(client)
  }

  findOneById(id: StreakId): Promise<Streak | null> {
    return this.repo.findOneById(id)
  }
  change(streak: Streak): Promise<string> {
    return this.repo.change(streak)
  }
  createEntity(streak: Streak): Promise<string> {
    return this.repo.createEntity(streak)
  }
}

export const streakStorage = new StreakStorage()
