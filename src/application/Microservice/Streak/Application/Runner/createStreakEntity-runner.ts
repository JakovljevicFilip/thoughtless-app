import { StreakAggregate } from '../../Domain/StreakAggregate'
import { streakStorage } from '../../Infrastructure/streak-storage'

import { logger } from 'src/application/Platform/Log/Application/log-service'

import type { Run } from 'src/application/Platform/Boot/Runner/Domain/Run'

export const createStreakEntity: Run = {
  RUN_NAME: 'Runner.Microservice.Streak.CreateStreakEntity',

  async run() {
    logger.write([this.RUN_NAME, 'creating streak entity'])
    const streak = StreakAggregate.createEntity()
    const entity = await streakStorage.findOneById(streak.id)

    if (entity === null) {
      await streakStorage.createEntity(streak)
      return
    }
  },
}
