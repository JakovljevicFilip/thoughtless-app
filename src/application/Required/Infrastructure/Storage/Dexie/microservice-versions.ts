import Dexie from 'dexie'

export const microserviceDb = new Dexie('MicroserviceDb')

export async function applyMicroserviceVersions(): Promise<void> {
  microserviceDb.version(1).stores({
    thought: 'id, content, created_at, discarded_at, status',
  })

  microserviceDb.version(2).stores({
    thought: 'id, content, created_at, discarded_at, status',
    streak: 'id, current_streak, date_of_count, count_for_date, last_qualified_date',
  })

  await microserviceDb.open()
}
