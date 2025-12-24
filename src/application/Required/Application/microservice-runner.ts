/**
 * MicroserviceRunner
 * -----------------------------------------------------------------------------
 * Application-level coordinator responsible for executing Required
 * (microservice-level) Runs.
 * Orchestrates microservice-specific execution flows.
 * Enables independent boot and runtime execution per microservice.
 */
import type { Runner } from 'src/application/Platform/Runner/Domain/Runner'

import { removeExpired } from 'src/application/Microservice/Thought/Application/Runner/removeExpired-run'

export const microserviceRunner: Runner = {
  RUNNER_NAME: 'microservice',

  async execute() {
    await removeExpired.run()
    // Future: import and run microservice boot runners here
  },
}
