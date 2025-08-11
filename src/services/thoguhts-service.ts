import { createThoughtRequest, listThoughtsRequest } from '../api/thoughts-client'
import { useThoughtsStore } from '../stores/thoughts-store'
import type { ExistingThought } from 'src/types/ExistingThought'

type ApiThought = { id: string; content: string; created_at: string; updated_at: string }
type ApiList = { data: ApiThought[] }

function toDomain(t: ApiThought): ExistingThought {
  return {
    id: t.id,
    content: t.content,
    createdAt: t.created_at,
    updatedAt: t.updated_at,
  }
}

export async function createThought(content: string): Promise<void> {
  const trimmed = content.trim()
  if (!trimmed) throw new Error('Thought content cannot be empty')
  await createThoughtRequest({ content: trimmed })
  await listThoughts() // refresh
}

export async function listThoughts(): Promise<void> {
  const store = useThoughtsStore()
  const res: ApiList = await listThoughtsRequest()
  const items: ExistingThought[] = res.data.map(toDomain)
  store.setThoughts(items)
}
