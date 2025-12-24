import type { ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'

import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

import { notify } from 'src/application/Platform/Notification/InApp/Application/inAppNotification-service'

export const useDiscard = async (thought: ActiveThought) => {
  try {
    await thoughtService.discard(thought)
    notify.success('Thought discarded.')
  } catch {
    notify.warning('Thought could not be discarded.')
  }
}
