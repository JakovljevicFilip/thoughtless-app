import { thoughtRules } from '../../Domain/Rules/thought-rules'

import { notice } from 'src/application/Platform/Notice/Application/notice-service'
import { Notice, Style } from 'src/application/Platform/Notice/Domain/Notice'

export const syncQuotaNotice = (numberOfActiveThoughts: number): void => {
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
      'Thought quota full',
      'You have reached the maximum number of active thoughts.',
      Style.warning
    )
  )
}
