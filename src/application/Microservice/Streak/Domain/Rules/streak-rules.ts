import { StreakDomainError } from '../StreakDomainError'

const MS_PER_DAY = 24 * 60 * 60 * 1000

export const streakRules = {
  toDateKey(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  isConsecutiveDay(previousDateKey: string, dateKey: string): boolean {
    const previous = new Date(previousDateKey).getTime()
    const current = new Date(dateKey).getTime()
    return Math.round((current - previous) / MS_PER_DAY) === 1
  },
}

type StreakRebuildRule = {
  canRebuild(props: {
    id: unknown
    currentStreak: unknown
    dateOfCount: unknown
    countForDate: unknown
    lastQualifiedDate: unknown
  }): asserts props is {
    id: string
    currentStreak: number
    dateOfCount: string
    countForDate: number
    lastQualifiedDate: string | null
  }
}

export const streakRebuildRule: StreakRebuildRule = {
  canRebuild(props) {
    const { id, currentStreak, dateOfCount, countForDate, lastQualifiedDate } = props

    if (
      typeof id !== 'string' ||
      typeof currentStreak !== 'number' ||
      typeof dateOfCount !== 'string' ||
      typeof countForDate !== 'number' ||
      (typeof lastQualifiedDate !== 'string' && lastQualifiedDate !== null)
    ) {
      throw new StreakDomainError('Invalid Streak persistence shape.', props)
    }
  },
}
