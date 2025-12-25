/**
 * TaskApplicationError
 * -----------------------------------------------------------------------------
 * Typed domain error specific to the Task application layer.
 */
import { ThoughtSettings } from '../Domain/ThoughtSettings'

import { ApplicationError } from 'src/application/Platform/AggregateSchema/Application/ApplicationError'

export class ThoughtApplicationError extends ApplicationError {
  constructor(message: string, caller: string, details?: unknown) {
    super(ThoughtSettings.aggregateName, caller, message, details)
  }
}
