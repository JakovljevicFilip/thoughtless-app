import { ThoughtDomainError } from '../ThoughtDomainError'

export class ThoughtStatus {
  private constructor(public readonly value: string) {}

  static readonly ACTIVE = new ThoughtStatus('active')
  static readonly DISCARDED = new ThoughtStatus('discarded')

  static fromString(input: string): ThoughtStatus {
    switch (input) {
      case 'active':
        return ThoughtStatus.ACTIVE
      case 'discarded':
        return ThoughtStatus.DISCARDED
      default:
        throw new ThoughtDomainError(`Invalid TaskStatus: ${input}`)
    }
  }

  toString(): string {
    return this.value
  }

  equals(other: ThoughtStatus | string): boolean {
    if (typeof other === 'string') {
      return this.value === other
    }
    return this.value === other.value
  }
}
