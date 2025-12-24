import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

export interface ThoughtRestorePayload {
  thought: Thought
  numberOfActiveThoughts: number
}
