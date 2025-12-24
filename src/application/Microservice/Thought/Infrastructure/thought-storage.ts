import { ThoughtDexie } from './Client/Dexie/thought-dexie'

import type { ThoughtRepository } from '../Domain/ThoughtRepository'
import type { Thought } from '../Domain/Thought'

import { StorageMaker } from 'src/application/Platform/Storage/Infrastructure/storage-maker'

class ThoughtStorage implements ThoughtRepository {
  private readonly repo: ThoughtRepository

  constructor() {
    const client = StorageMaker.make('Thought')
    this.repo = new ThoughtDexie(client)
  }

  save(thought: Thought): Promise<string> {
    return this.repo.save(thought)
  }
  update(thought: Thought): Promise<string> {
    return this.repo.update(thought)
  }
  remove(thought: Thought): Promise<string> {
    return this.repo.remove(thought)
  }
  listActive(): Promise<Thought[]> {
    return this.repo.listActive()
  }
  listDiscarded(): Promise<Thought[]> {
    return this.repo.listDiscarded()
  }
  removeMultiple(thoughts: Thought[]): Promise<string[]> {
    return this.repo.removeMultiple(thoughts)
  }
}

export const thoughtStorage = new ThoughtStorage()
