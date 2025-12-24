import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtStorage } from 'src/application/Microservice/Thought/Infrastructure/thought-storage'

import type { List } from 'src/application/Platform/Service/Domain/CQRS/Query/List'

class DiscardedQuery implements List<Thought> {
  async list(): Promise<Thought[]> {
    const thoughts = await thoughtStorage.listDiscarded()
    return thoughts
  }
}

export const thoughtListDiscardedQuery = new DiscardedQuery()
