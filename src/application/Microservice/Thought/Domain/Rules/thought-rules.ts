import { ThoughtError } from '../ThoughtError'
import { ThoughtSettings } from '../ThoughtSettings'
import { ThoughtStatus } from '../ValueObject/ThoughtStatus'

export const thoughtRules = {
  validateContentNotEmpty(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new ThoughtError('Thought content cannot be empty.')
    }
  },

  validateContentLength(content: string): void {
    const trimmed = content.trim().length
    const min = ThoughtSettings.minContentLength
    const max = ThoughtSettings.maxContentLength

    if (trimmed < min || trimmed > max) {
      throw new ThoughtError(`Thought content must be between ${min} and ${max} characters.`)
    }
  },

  canRecord(content: string, numberOfActiveThoughts: number): void {
    this.validateContentNotEmpty(content)
    this.validateContentLength(content)

    if (numberOfActiveThoughts >= ThoughtSettings.maxActive) {
      throw new ThoughtError(`Cannot have more than ${ThoughtSettings.maxActive} active thoughts.`)
    }
  },

  canChange(currentStatus: ThoughtStatus, createdAt: Date, newContent: string): void {
    if (!currentStatus.equals(ThoughtStatus.ACTIVE)) {
      throw new ThoughtError('Only active thoughts can be changed.')
    }

    if (this.isExpired(createdAt)) {
      throw new ThoughtError('Expired thoughts cannot be changed.')
    }

    this.validateContentNotEmpty(newContent)
    this.validateContentLength(newContent)
  },

  canDiscard(currentStatus: ThoughtStatus, numberOfDiscardedThoughts: number): void {
    if (!currentStatus.equals(ThoughtStatus.ACTIVE)) {
      throw new ThoughtError('Only active thoughts can be discarded.')
    }

    if (numberOfDiscardedThoughts >= ThoughtSettings.maxDiscarded) {
      throw new ThoughtError(
        `Cannot have more than ${ThoughtSettings.maxDiscarded} discarded thoughts.`
      )
    }
  },

  canRestore(currentStatus: ThoughtStatus, numberOfActiveThoughts: number): void {
    if (!currentStatus.equals(ThoughtStatus.DISCARDED)) {
      throw new ThoughtError('Only discarded thoughts can be restored.')
    }

    if (numberOfActiveThoughts >= ThoughtSettings.maxActive) {
      throw new ThoughtError(`Cannot have more than ${ThoughtSettings.maxActive} active thoughts.`)
    }
  },

  canRemove(currentStatus: ThoughtStatus): void {
    if (!currentStatus.equals(ThoughtStatus.DISCARDED)) {
      throw new ThoughtError('Only discarded thoughts can be removed.')
    }
  },

  isExpired(createdAt: Date): boolean {
    const expiresAt = new Date(createdAt)
    expiresAt.setDate(expiresAt.getDate() + ThoughtSettings.lifetimeDays)

    return Date.now() >= expiresAt.getTime()
  },
}
