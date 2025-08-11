import type { ExistingThought } from 'src/types/ExistingThought'
import { createThoughtRequest } from '../api/thoughts-client'
import { useThoughtsStore } from '../stores/thoughts-store'

export async function createThought(content: string): Promise<ExistingThought> {
  const store = useThoughtsStore()
  const trimmed = content.trim()
  if (!trimmed) throw new Error('Thought content cannot be empty')

  const dto = await createThoughtRequest({ content: trimmed })

  const thought: ExistingThought = {
    id: dto.id,
    content: dto.content,
    createdAt: dto.createdAt,
  }

  store.addThought(thought)

  return thought
}
