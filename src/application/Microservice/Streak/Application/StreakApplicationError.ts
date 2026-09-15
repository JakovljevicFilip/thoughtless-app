import { StreakSettings } from '../Domain/StreakSettings'

import { ApplicationError } from 'src/application/Platform/AggregateSchema/Application/ApplicationError'

export class StreakApplicationError extends ApplicationError {
  constructor(message: string, caller: string, details?: unknown) {
    super(StreakSettings.aggregateName, caller, message, details)
  }
}
