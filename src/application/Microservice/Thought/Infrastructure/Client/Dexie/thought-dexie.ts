import type { ThoughtDexieORM } from './ThoughtDexieORM'

import type { Thought } from '../../../Domain/Thought'
import type { ThoughtRepository } from '../../../Domain/ThoughtRepository'

import { ThoughtStatus } from '../../../Domain/ValueObject/ThoughtStatus'
import { ThoughtAggregate } from '../../../Domain/ThoughtAggregate'

import type { DexieRepository } from 'src/application/Platform/Storage/Dexie/Domain/DexieRepository'

export class ThoughtDexie implements ThoughtRepository {
  constructor(private readonly client: DexieRepository) {}

  async save(thought: Thought): Promise<string> {
    const orm = {
      id: thought.id.toString(),
      content: thought.content,
      created_at: thought.created_at,
      discarded_at: thought.discarded_at,
      status: thought.status.toString(),
    }

    return await this.client.create(orm)
  }

  async update(thought: Thought): Promise<string> {
    const orm = {
      id: thought.id.toString(),
      content: thought.content,
      created_at: thought.created_at,
      discarded_at: thought.discarded_at,
      status: thought.status.toString(),
    }

    return await this.client.update(orm)
  }

  async remove(thought: Thought): Promise<string> {
    return await this.client.delete(thought.id.toString())
  }

  async removeMultiple(thoughts: Thought[]): Promise<string[]> {
    const ids = thoughts.map(thought => thought.id.toString())
    return await this.client.deleteMultiple(ids)
  }

  async listActive(): Promise<Thought[]> {
    const rows = (await this.client.where(
      'status',
      ThoughtStatus.ACTIVE.toString()
    )) as ThoughtDexieORM[]

    rows.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

    const aggregate = new ThoughtAggregate()

    return rows.map(row =>
      aggregate.rebuild(row.id, row.content, row.created_at, row.discarded_at, row.status)
    )
  }

  async listDiscarded(): Promise<Thought[]> {
    const rows = (await this.client.where(
      'status',
      ThoughtStatus.DISCARDED.toString()
    )) as ThoughtDexieORM[]

    rows.sort((a, b) => new Date(a.discarded_at!).getTime() - new Date(b.discarded_at!).getTime())

    const aggregate = new ThoughtAggregate()

    return rows.map(row =>
      aggregate.rebuild(row.id, row.content, row.created_at, row.discarded_at, row.status)
    )
  }
}
