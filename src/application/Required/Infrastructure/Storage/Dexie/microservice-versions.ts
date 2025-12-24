import Dexie from 'dexie'

export const microserviceDb = new Dexie('MicroserviceDb')

export async function applyMicroserviceVersions(): Promise<void> {
  microserviceDb.version(1).stores({
    thought: 'id, content, created_at, discarded_at, status',
  })

  await microserviceDb.open()
}
