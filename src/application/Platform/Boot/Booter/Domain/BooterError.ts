/**
 * BooterError
 * -----------------------------------------------------------------------------
 * Domain-level error representing a failure during Boot or Booter execution.
 *
 * - Signals execution or orchestration failures
 * - May be wrapped or enriched by higher layers
 *
 * Enables consistent error handling across Booter-based execution flows.
 */

import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'

export class BooterError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('Booter', message, details)
  }
}
