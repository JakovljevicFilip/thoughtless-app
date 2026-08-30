/**
 * ExampleRunner
 * -----------------------------------------------------------------------------
 * Application-level coordinator responsible for executing Example Runs.
 * Groups and executes Example-specific Runs.
 * Acts as the orchestration boundary for Example initialization.
 */

import type { Runner } from 'src/application/Platform/Boot/Runner/Domain/Runner'

import { createDemoTask } from 'src/application/Example/Task/Application/Runner/createDemoTask-run'

export const exampleRunner: Runner = {
  RUNNER_NAME: 'example',

  async execute() {
    await createDemoTask.run()
    // Future: import and run Example boot runners here
  },
}
