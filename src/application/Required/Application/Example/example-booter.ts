/**
 * ExampleBooter
 * -----------------------------------------------------------------------------
 * Application-level coordinator responsible for executing Example Boots.
 * Groups and executes Example-specific standing wiring.
 * Acts as the orchestration boundary for Example initialization.
 */

import type { Booter } from 'src/application/Platform/Boot/Booter/Domain/Booter'

import { frontDeskSubscriber } from 'src/application/Example/EventBusDemo/FrontDesk/Application/Event/frontDesk-subscribers'
import { stationSubscriber } from 'src/application/Example/EventBusDemo/Station/Application/Event/station-subscribers'

export const exampleBooter: Booter = {
  BOOTER_NAME: 'example',

  async execute() {
    await frontDeskSubscriber.boot()
    await stationSubscriber.boot()
    // Future: import and run Example boot processes here
  },
}
