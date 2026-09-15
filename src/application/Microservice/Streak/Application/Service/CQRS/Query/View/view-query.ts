import type { Streak } from 'src/application/Microservice/Streak/Domain/Streak'
import type { StreakId } from 'src/application/Microservice/Streak/Domain/ValueObject/StreakId'

import { streakStorage } from 'src/application/Microservice/Streak/Infrastructure/streak-storage'

import type { View } from 'src/application/Platform/Service/Domain/CQRS/Query/View'

class ViewQuery implements View<StreakId, Streak> {
  async view(id: StreakId): Promise<Streak | null> {
    return await streakStorage.findOneById(id)
  }
}

export const streakViewQuery = new ViewQuery()
