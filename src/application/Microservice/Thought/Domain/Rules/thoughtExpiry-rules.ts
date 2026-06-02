import { ThoughtSettings } from '../ThoughtSettings'
import { ThoughtExpiryStatus } from '../ValueObject/ThoughtExpiryStatus'

const MS_PER_MINUTE = 60_000
const MS_PER_HOUR = 60 * MS_PER_MINUTE
const MS_PER_DAY = 24 * MS_PER_HOUR

export const getExpiresAt = (createdAt: Date): Date => {
  const expiresAt = new Date(createdAt)
  expiresAt.setDate(expiresAt.getDate() + ThoughtSettings.lifetimeDays)
  return expiresAt
}

export const getExpiryStatusFromExpiresAt = (
  expiresAt: Date,
  now = Date.now()
): ThoughtExpiryStatus => {
  const remainingMs = expiresAt.getTime() - now

  if (remainingMs <= 0) {
    return ThoughtExpiryStatus.EXPIRED
  }

  const remainingDays = remainingMs / MS_PER_DAY

  if (remainingDays <= ThoughtSettings.warningIntervalDays || remainingMs < MS_PER_MINUTE) {
    return ThoughtExpiryStatus.ABOUT_TO_EXPIRE
  }

  return ThoughtExpiryStatus.IDLE
}
