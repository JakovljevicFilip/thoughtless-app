import { ThoughtExpiryStatus } from 'src/application/Microservice/Thought/Domain/ValueObject/ThoughtExpiryStatus'

export type ExpiryColor = 'primary' | 'warning' | 'secondary'

export const getExpiryColor = (status: ThoughtExpiryStatus): ExpiryColor => {
  switch (status) {
    case ThoughtExpiryStatus.ABOUT_TO_EXPIRE:
      return 'primary'
    case ThoughtExpiryStatus.EXPIRED:
      return 'warning'
    default:
      return 'secondary'
  }
}
