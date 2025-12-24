import type { Thought } from './Thought'

import type { AggregateRepository } from 'src/application/Platform/AggregateSchema/Domain/AggregateRepository'

export interface ThoughtRepository extends AggregateRepository {
  save(thought: Thought): Promise<string>
  update(thought: Thought): Promise<string>
  remove(thought: Thought): Promise<string>
  removeMultiple(thoughts: Thought[]): Promise<string[]>
  listActive(): Promise<Thought[]>
  listDiscarded(): Promise<Thought[]>
}
