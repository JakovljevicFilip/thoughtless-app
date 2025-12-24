import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

export const useRemove = async (thought: Thought) => {
  try {
    await thoughtService.remove(thought)
    notify.success('Thought removed.')
  } catch {
    notify.warning('Thought could not be removed.')
  }
}
