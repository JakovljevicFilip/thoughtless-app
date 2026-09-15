import { Uuid } from 'src/application/Platform/AggregateSchema/Domain/ValueObject/Uuid'

export class StreakId extends Uuid {
  static override generate(): StreakId {
    return new StreakId(crypto.randomUUID())
  }

  static override fromString(input: string): StreakId {
    return new StreakId(input)
  }
}
