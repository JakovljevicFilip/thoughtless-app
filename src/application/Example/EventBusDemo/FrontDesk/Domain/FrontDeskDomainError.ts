/**
 * FrontDeskDomainError
 * -----------------------------------------------------------------------------
 * Typed domain error specific to FrontDesk.
 */

import { DomainError } from 'src/application/Platform/AggregateSchema/Domain/DomainError'

export class FrontDeskDomainError extends DomainError {
  constructor(message: string, details?: unknown) {
    super('FrontDesk', message, details)
  }
}
