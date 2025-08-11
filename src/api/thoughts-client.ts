import type { NewThought } from 'src/types/NewThought'
import type { ExistingThought } from 'src/types/ExistingThought'

export type ThoughtCreateResponse = {
  id: string
  createdAt: string
  content: string
}

export type ThoughtListingResponse = ExistingThought[]

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

// src/api/thoughts-client.ts
export async function listThoughtsRequest(): Promise<ThoughtListingResponse> {
  const res = await fetch(`${API_BASE}/thoughts`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const data = await res.json()
  return Array.isArray(data) ? data : data.data
}


export async function deleteThoughtRequest(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/thoughts/${encodeURIComponent(id)}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
}
