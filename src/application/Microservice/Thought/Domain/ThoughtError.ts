import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/AggregateError'

export class ThoughtError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Thought', message, details)
  }
}
