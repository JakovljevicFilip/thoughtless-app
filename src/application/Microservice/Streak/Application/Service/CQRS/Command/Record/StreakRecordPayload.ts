import type { Streak } from 'src/application/Microservice/Streak/Domain/Streak'

export interface StreakRecordPayload {
  streak: Streak
  discardedAt: Date
}
