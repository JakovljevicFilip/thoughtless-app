import { Uuid } from 'src/application/Platform/AggregateSchema/Domain/ValueObject/Uuid'

export class ThoughtId extends Uuid {
  static override generate(): ThoughtId {
    return new ThoughtId(crypto.randomUUID())
  }

  static override fromString(input: string): ThoughtId {
    return new ThoughtId(input)
  }
}
