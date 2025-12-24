import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

class ActiveQuery implements List<Thought> {
  async list(): Promise<Thought[]> {
    const thoughts = await thoughtStorage.listActive()
    return thoughts
  }
}

export const thoughtListActiveQuery = new ActiveQuery()
