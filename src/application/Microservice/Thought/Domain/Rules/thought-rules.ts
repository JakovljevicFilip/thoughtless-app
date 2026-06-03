import { ThoughtDomainError } from '../ThoughtDomainError'
import { ThoughtSettings } from '../ThoughtSettings'
import { ThoughtStatus } from '../ValueObject/ThoughtStatus'

export const thoughtRules = {
  validateContentNotEmpty(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new ThoughtDomainError('Thought content cannot be empty.')
    }
  },

  validateContentLength(content: string): void {
    const trimmed = content.trim().length
    const min = ThoughtSettings.minContentLength
    const max = ThoughtSettings.maxContentLength

    if (trimmed < min || trimmed > max) {
      throw new ThoughtDomainError(`Thought content must be between ${min} and ${max} characters.`)
    }
  },

  canRecord(content: string, numberOfActiveThoughts: number): void {
    this.validateContentNotEmpty(content)
    this.validateContentLength(content)

    if (numberOfActiveThoughts >= ThoughtSettings.maxActive) {
      throw new ThoughtDomainError(
        `Cannot have more than ${ThoughtSettings.maxActive} active thoughts.`
      )
    }
  },

  isActiveQuotaFull(numberOfActiveThoughts: number): boolean {
    return numberOfActiveThoughts >= ThoughtSettings.maxActive
  },

  canAlter(currentStatus: ThoughtStatus, createdAt: Date, alteredContent: string): void {
    if (!currentStatus.equals(ThoughtStatus.ACTIVE)) {
      throw new ThoughtDomainError('Only active thoughts can be altered.')
    }

    if (this.isExpired(createdAt)) {
      throw new ThoughtDomainError('Expired thoughts cannot be altered.')
    }

    this.validateContentNotEmpty(alteredContent)
    this.validateContentLength(alteredContent)
  },

  canDiscard(currentStatus: ThoughtStatus, numberOfDiscardedThoughts: number): void {
    if (!currentStatus.equals(ThoughtStatus.ACTIVE)) {
      throw new ThoughtDomainError('Only active thoughts can be discarded.')
    }

    if (numberOfDiscardedThoughts >= ThoughtSettings.maxDiscarded) {
      throw new ThoughtDomainError(
        `Cannot have more than ${ThoughtSettings.maxDiscarded} discarded thoughts.`
      )
    }
  },

  canRestore(currentStatus: ThoughtStatus, numberOfActiveThoughts: number): void {
    if (!currentStatus.equals(ThoughtStatus.DISCARDED)) {
      throw new ThoughtDomainError('Only discarded thoughts can be restored.')
    }

    if (numberOfActiveThoughts >= ThoughtSettings.maxActive) {
      throw new ThoughtDomainError(
        `Cannot have more than ${ThoughtSettings.maxActive} active thoughts.`
      )
    }
  },

  canRemove(currentStatus: ThoughtStatus): void {
    if (!currentStatus.equals(ThoughtStatus.DISCARDED)) {
      throw new ThoughtDomainError('Only discarded thoughts can be removed.')
    }
  },

  isExpired(createdAt: Date): boolean {
    const expiresAt = new Date(createdAt)
    expiresAt.setDate(expiresAt.getDate() + ThoughtSettings.lifetimeDays)

    return Date.now() >= expiresAt.getTime()
  },
}
