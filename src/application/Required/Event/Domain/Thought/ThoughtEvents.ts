export const THOUGHT_DISCARDED_TOPIC = 'Thought.Discarded' as const

export interface ThoughtDiscardedPayload {
  discardedAt: Date
}
