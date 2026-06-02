import type { Thought } from '../../Domain/Thought'
import type { ThoughtExpiryStatus } from '../../Domain/ValueObject/ThoughtExpiryStatus'

export type ActiveThought = Thought & {
  expiresAt: Date
  expiryStatus: ThoughtExpiryStatus
}
