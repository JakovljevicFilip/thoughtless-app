import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

export interface ThoughtChangePayload {
  thought: Thought
  changedContent: string
}
