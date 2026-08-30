import { applyPlatformVersions } from 'src/application/Platform/Infrastructure/Storage/Dexie/platform-versions'
import { applyExampleVersions } from 'src/application/Required/Infrastructure/Storage/Dexie/Example/example-versions'
import { applyMicroserviceVersions } from 'src/application/Required/Infrastructure/Storage/Dexie/microservice-versions'

import { logger } from 'src/application/Platform/Log/Application/log-service'

import type { Run } from 'src/application/Platform/Boot/Runner/Domain/Run'

export const applyDexieMigrations: Run = {
  RUN_NAME: 'Runner.Platform.Storage.ApplyDexieMigrations',

  async run() {
    logger.write([this.RUN_NAME, 'applying dexie migrations'])
    await applyPlatformVersions()
    await applyExampleVersions()
    await applyMicroserviceVersions()
  },
}
