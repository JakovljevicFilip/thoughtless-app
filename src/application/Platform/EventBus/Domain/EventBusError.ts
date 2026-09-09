/**
 * EventBusError
 * -----------------------------------------------------------------------------
 * Domain-level error representing one or more subscriber failures during publish.
 *
 * Isolation happens in the adapter (one throwing subscriber must not stop
 * delivery to the others); deciding what a failure means is left to whoever
 * calls publish, so the adapter surfaces failures upward instead of logging
 * them itself.
 */

import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'

export class EventBusError extends DomainError {
  constructor(topic: string, errors: unknown[]) {
    super('EventBus', `${errors.length} subscriber(s) failed for topic "${topic}"`, errors)
  }
}
