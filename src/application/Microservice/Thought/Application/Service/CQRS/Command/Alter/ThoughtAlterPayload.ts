import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

export interface ThoughtAlterPayload {
  thought: Thought
  alteredContent: string
}
