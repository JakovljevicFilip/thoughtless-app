import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

import { notifyPublisher } from 'src/application/Platform/Notification/InApp/Application/Event/notify-publishers'

export const useRemove = async (thought: Thought) => {
  try {
    await thoughtService.remove(thought)
    notifyPublisher.success('Thought removed.')
  } catch {
    notifyPublisher.warning('Thought could not be removed.')
  }
}
