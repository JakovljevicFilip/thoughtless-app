const MS_PER_MINUTE = 60_000
const MS_PER_HOUR = 60 * MS_PER_MINUTE
const MS_PER_DAY = 24 * MS_PER_HOUR

export const getTimeRemainingFromExpiresAt = (expiresAt: Date, now = Date.now()): string => {
  const remainingMs = expiresAt.getTime() - now

  if (remainingMs <= 0) return 'Expired'
  if (remainingMs < MS_PER_MINUTE) return 'About to expire'

  const totalMinutes = Math.floor(remainingMs / MS_PER_MINUTE)
  const totalHours = Math.floor(remainingMs / MS_PER_HOUR)
  const days = Math.floor(remainingMs / MS_PER_DAY)

  if (totalHours < 1) return `${totalMinutes}m`
  if (days < 1) return `${totalHours}h`

  const hoursRemainder = totalHours % 24
  return hoursRemainder > 0 ? `${days}d ${hoursRemainder}h` : `${days}d`
}
