import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'

export class ThoughtDomainError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Thought', message, details)
  }
}
