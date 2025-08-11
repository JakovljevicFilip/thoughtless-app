import { createThoughtRequest, listThoughtsRequest, deleteThoughtRequest } from '../api/thoughts-client'
import { useThoughtsStore } from '../stores/thoughts-store'

export async function createThought(content: string): Promise<void> {
  const trimmed = content.trim()
  if (!trimmed) throw new Error('Thought content cannot be empty')
  await createThoughtRequest({ content: trimmed })
  await listThoughts()
}

export async function listThoughts(): Promise<void> {
  const store = useThoughtsStore()
  const res = await listThoughtsRequest()
  store.setThoughts(res)
}

export async function deleteThought(id: string): Promise<void> {
  await deleteThoughtRequest(id)
  await listThoughts()
}
