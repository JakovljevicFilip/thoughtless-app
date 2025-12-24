import type { Thought } from '../../Domain/Thought'

export enum ActiveThoughtExpiryStatus {
  IDLE = 'IDLE',
  ABOUT_TO_EXPIRE = 'ABOUT_TO_EXPIRE',
  EXPIRED = 'EXPIRED',
}

export type ActiveThought = Thought & {
  expiresAt: Date
  expiryStatus: ActiveThoughtExpiryStatus
}
