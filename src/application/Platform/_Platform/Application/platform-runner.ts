/**
 * PlatformRunner
 * -----------------------------------------------------------------------------
 * Application-level coordinator responsible for executing Platform Runs.
 * Groups and executes Platform-specific Runs.
 * Acts as the orchestration boundary for Platform initialization.
 */
import type { Runner } from '../../Boot/Runner/Domain/Runner'

import { applyDexieMigrations } from '../../Storage/Dexie/Application/Runner/applyDexieMigrations-run'
import { createDarkModeEntity } from '../../DarkMode/Application/Runner/createDarkModeEntity-runner'

export const platformRunner: Runner = {
  RUNNER_NAME: 'platform',

  async execute() {
    await applyDexieMigrations.run()
    await createDarkModeEntity.run()
    // Future: import and run Platform boot runners here
  },
}
