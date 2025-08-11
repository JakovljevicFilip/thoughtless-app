import type { NewThought } from "src/types/NewThought"

export type ThoughtCreateResponse = {
  id: string
  createdAt: string
  content: string
}

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:80/api'

export async function createThoughtRequest(payload: NewThought): Promise<ThoughtCreateResponse> {
  const res = await fetch(`${API_BASE}/thoughts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}
