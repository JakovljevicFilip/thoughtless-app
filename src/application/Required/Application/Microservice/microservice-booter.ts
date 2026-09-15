/**
 * MicroserviceBooter
 * -----------------------------------------------------------------------------
 * Application-level coordinator responsible for executing Required
 * (microservice-level) Boots.
 * Groups and executes microservice-specific standing wiring.
 * Acts as the orchestration boundary for microservice initialization.
 */

import type { Booter } from 'src/application/Platform/Boot/Booter/Domain/Booter'

import { streakSubscriber } from 'src/application/Microservice/Streak/Application/Event/streak-subscribers'

export const microserviceBooter: Booter = {
  BOOTER_NAME: 'microservice',

  async execute() {
    await streakSubscriber.boot()
  },
}
