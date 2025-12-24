import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

export interface ThoughtRemovePayload {
  thought: Thought
}
