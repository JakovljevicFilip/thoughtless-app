import { thoughtRules } from '../../Domain/Rules/thought-rules'

import { notice } from 'src/application/Platform/Notice/Application/notice-service'
import { Notice, Style } from 'src/application/Platform/Notice/Domain/Notice'

export const syncActiveQuotaNotice = (numberOfActiveThoughts: number): void => {
  const domainName = 'Thought'
  const scenario = 'active_quota_full'

  if (!thoughtRules.isActiveQuotaFull(numberOfActiveThoughts)) {
    notice.clearDomainScenario(domainName, scenario)
    return
  }

  notice.addDomainNotice(
    domainName,
    new Notice(
      scenario,
      'You have too many thoughts',
      'Free up some space to save more.',
      Style.warning
    )
  )
}
