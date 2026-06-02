import type { ActiveThought } from 'src/application/Microservice/Thought/Application/Types/ActiveThought'

import { ThoughtExpiryStatus } from 'src/application/Microservice/Thought/Domain/ValueObject/ThoughtExpiryStatus'

import { notice } from 'src/application/Platform/Notice/Application/notice-service'
import { Notice, Style } from 'src/application/Platform/Notice/Domain/Notice'

import { watchEffect } from 'vue'

export const useExpiryNotices = (thoughts: () => ActiveThought[]) => {
  watchEffect(() => {
    const all = thoughts()

    handleExpired(all)
    handleAboutToExpire(all)
  })
}

const handleExpired = (thoughts: ActiveThought[]): void => {
  const expired = thoughts.filter(t => t.expiryStatus === ThoughtExpiryStatus.EXPIRED)

  if (expired.length === 0) {
    notice.clearDomainScenario('Thought', 'expired')
    return
  }

  notice.addDomainNotice(
    'Thought',
    new Notice(
      'expired',
      'Thoughts expired',
      'Expired thoughts will be automatically removed.',
      Style.warning
    )
  )
}

const handleAboutToExpire = (thoughts: ActiveThought[]): void => {
  const aboutToExpire = thoughts.filter(t => t.expiryStatus === ThoughtExpiryStatus.ABOUT_TO_EXPIRE)
  if (aboutToExpire.length === 0) {
    notice.clearDomainScenario('Thought', 'about_to_expire')
    return
  }

  notice.addDomainNotice(
    'Thought',
    new Notice(
      'about_to_expire',
      'Thoughts expiring soon',
      aboutToExpire.length === 1
        ? 'There is 1 thought that is about to expire'
        : `There are ${aboutToExpire.length} thoughts that are about to expire`,
      Style.danger
    )
  )
}
