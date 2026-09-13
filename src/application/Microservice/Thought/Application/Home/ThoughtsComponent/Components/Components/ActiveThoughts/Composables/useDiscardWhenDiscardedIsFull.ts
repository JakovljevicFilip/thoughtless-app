import type { ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'

import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

import { notifyPublisher } from 'src/application/Platform/Notification/InApp/Application/Event/notify-publishers'


export const useDiscardWhenDiscardedIsFull = async (thought: ActiveThought) => {
  try {
    await thoughtService.discardWhenDiscardedIsFull(thought)
    notifyPublisher.success('Thought discarded.')
  } catch {
    notifyPublisher.warning('Thought could not be discarded.')
  }
}
