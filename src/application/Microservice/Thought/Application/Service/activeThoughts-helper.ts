import type { Thought } from '../../Domain/Thought'
import { getExpiresAt, getExpiryStatusFromExpiresAt } from '../../Domain/Rules/thoughtExpiry-rules'
import type { ActiveThought } from '../Types/ActiveThought'

export const makeActiveThoughts = (thoughts: Thought[], now = Date.now()): ActiveThought[] => {
  return thoughts.map(thought => {
    const expiresAt = getExpiresAt(thought.created_at)

    return {
      ...thought,
      expiresAt,
      expiryStatus: getExpiryStatusFromExpiresAt(expiresAt, now),
    }
  })
}
