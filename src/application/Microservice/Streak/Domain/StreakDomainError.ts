import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'
import { StreakSettings } from './StreakSettings'

export class StreakDomainError extends DomainError {
  constructor(message: string, details?: unknown) {
    super(StreakSettings.aggregateName, message, details)
  }
}
