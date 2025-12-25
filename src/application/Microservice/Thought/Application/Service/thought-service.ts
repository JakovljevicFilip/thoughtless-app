import { useThoughtStore } from '../thought-store'

import { thoughtChangeHandler } from './CQRS/Command/Change/change-handler'
import { thoughtDiscardHandler } from './CQRS/Command/Discard/discard-handler'
import { thoughtRecordHandler } from './CQRS/Command/Record/record-handler'
import { thoughtRemoveHandler } from './CQRS/Command/Remove/remove-handler'
import { thoughtRestoreHandler } from './CQRS/Command/Restore/restore-handler'

import { thoughtListActiveHandler } from './CQRS/Query/Active/active-handler'
import { thoughtListDiscardedHandler } from './CQRS/Query/Discarded/discarded-handler'

import type { Thought } from '../../Domain/Thought'

import { ThoughtSettings } from '../../Domain/ThoughtSettings'
import { storeToRefs } from 'pinia'
import { ThoughtApplicationError } from '../ThoughtApplicationError'

export const thoughtService = {
  // COMMANDS
  async record(content: string): Promise<void> {
    const store = useThoughtStore()
    await thoughtRecordHandler.record(content, store.active.length)
    await this.listActive()
  },

  async change(thought: Thought, changedContent: string): Promise<void> {
    await thoughtChangeHandler.change(thought, changedContent)
    await this.listActive()
  },

  async discard(thought: Thought): Promise<void> {
    const store = useThoughtStore()
    await thoughtDiscardHandler.discard(thought, store.discarded.length)

    await this.listActive()
    await this.listDiscarded()
  },

  async forceDiscard(thought: Thought): Promise<void> {
    const store = useThoughtStore()
    const { discarded } = storeToRefs(store)

    if (discarded.value.length < ThoughtSettings.maxDiscarded) {
      throw new ThoughtApplicationError(
        'discard',
        'There are no thoughts that need to be force discarded.'
      )
    }

    const oldestDiscarded = store.getOldestDiscarded()
    if (oldestDiscarded === null) {
      throw new ThoughtApplicationError('discard', 'Discarded thoughts are missing.')
    }

    await this.remove(oldestDiscarded)
    await thoughtDiscardHandler.discard(thought, discarded.value.length)

    await this.listActive()
    await this.listDiscarded()
  },

  async restore(thought: Thought): Promise<void> {
    const store = useThoughtStore()
    await thoughtRestoreHandler.restore(thought, store.active.length)

    await this.listActive()
    await this.listDiscarded()
  },

  async remove(thought: Thought): Promise<void> {
    await thoughtRemoveHandler.remove(thought)
    await this.listDiscarded()
  },

  // QUERY
  async listActive(): Promise<void> {
    const active = await thoughtListActiveHandler.listActive()
    const store = useThoughtStore()
    store.setActiveThoughts(active)
  },

  async listDiscarded(): Promise<void> {
    const active = await thoughtListDiscardedHandler.listDiscarded()
    const store = useThoughtStore()
    store.setDiscardedThoughts(active)
  },
}
