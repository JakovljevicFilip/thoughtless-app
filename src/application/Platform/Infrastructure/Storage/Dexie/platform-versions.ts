import Dexie from 'dexie'

export const platformDb = new Dexie('PlatformDB')

export async function applyPlatformVersions(): Promise<void> {
  platformDb.version(2).stores({
    dark_mode: 'id, value',
  })

  // Add future platform-level versions here

  await platformDb.open()
}
