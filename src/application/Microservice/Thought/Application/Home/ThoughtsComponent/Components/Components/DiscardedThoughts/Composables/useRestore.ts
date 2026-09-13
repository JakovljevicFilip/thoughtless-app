import type { Thought } from 'src/application/Microservice/Thought/Domain/Thought'

import { thoughtService } from 'src/application/Microservice/Thought/Application/Service/thought-service'

import { notifyPublisher } from 'src/application/Platform/Notification/InApp/Application/Event/notify-publishers'

export const useRestore = async (thought: Thought) => {
  try {
    await thoughtService.restore(thought)
    notifyPublisher.success('Thought restored.')
  } catch {
    notifyPublisher.warning('Thought could not be restored.')
  }
}
