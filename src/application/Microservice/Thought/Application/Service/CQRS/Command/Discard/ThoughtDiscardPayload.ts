import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

export interface ThoughtDiscardPayload {
  thought: Thought
  numberOfDiscardedThoughts: number
}
