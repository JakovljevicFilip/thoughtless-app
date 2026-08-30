/**
 * RootBooter
 * -----------------------------------------------------------------------------
 * Top-level application coordinator responsible for executing all system Booters.
 *
 * - Orchestrates Platform, Example, and Microservice booters
 * - Defines global execution order
 *
 * Serves as the single entry point into the Booter system.
 */

import type { Booter } from '../Domain/Booter'
import { BooterError } from '../Domain/BooterError'

import { logger } from '../../../Log/Application/log-service'

import { platformBooter } from '../../../Application/platform-booter'
import { exampleBooter } from 'src/application/Required/Application/Example/example-booter'
import { microserviceBooter } from 'src/application/Required/Application/Microservice/microservice-booter'

export const rootBooter: Booter = {
  BOOTER_NAME: 'root',

  async execute() {
    logger.write(['Booter.Root.Init', 'starting platform + example + microservice booters'])

    try {
      logger.write(['Booter.Platform.Init', 'running platform booters'])
      await platformBooter.execute()
      logger.write(['Booter.Platform.End', 'finished all platform booter processes'])
    } catch (error) {
      logger.write(new BooterError('Platform.Error', error))
    }

    try {
      logger.write(['Booter.Example.Init', 'running example booters'])
      await exampleBooter.execute()
      logger.write(['Booter.Example.End', 'finished all example booter processes'])
    } catch (error) {
      logger.write(new BooterError('Example.Error', error))
    }

    try {
      logger.write(['Booter.Microservice.Init', 'running microservice booters'])
      await microserviceBooter.execute()
      logger.write(['Booter.Microservice.End', 'finished all microservice booter processes'])
    } catch (error) {
      logger.write(new BooterError('Microservice.Error', error))
    }

    logger.write(['Booter.Root.End', 'finished all booter processes'])
  },
}
