import Dexie from 'dexie'

export const exampleDb = new Dexie('ExampleDb')

export async function applyExampleVersions(): Promise<void> {
  exampleDb.version(1).stores({
    task: 'id, body, status, created_at',
  })

  // Add future example-level versions here

  await exampleDb.open()
}
