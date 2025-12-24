import type { ThoughtId } from './ValueObject/ThoughtId'
import type { ThoughtStatus } from './ValueObject/ThoughtStatus'

import { type AggregateEntity } from 'src/application/Platform/AggregateSchema/Domain/AggregateEntity'

export class Thought implements AggregateEntity {
  constructor(
    public readonly id: ThoughtId,
    public readonly content: string,
    public readonly created_at: Date,
    public readonly discarded_at: Date | null,
    public readonly status: ThoughtStatus
  ) {}
}
