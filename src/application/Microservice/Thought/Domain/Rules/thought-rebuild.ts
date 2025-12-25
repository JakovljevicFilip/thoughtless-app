import { ThoughtDomainError } from '../ThoughtDomainError'

type ThoughtRebuildRule = {
  canRebuild(props: {
    content: unknown
    created_at: unknown
    discarded_at: unknown
    status: unknown
  }): asserts props is {
    content: string
    created_at: Date
    discarded_at: Date | null
    status: string
  }
}

export const thoughtRebuildRule: ThoughtRebuildRule = {
  canRebuild(props) {
    const { content, created_at, discarded_at, status } = props

    if (
      typeof content !== 'string' ||
      !(created_at instanceof Date) ||
      !(discarded_at === null || discarded_at instanceof Date) ||
      typeof status !== 'string'
    ) {
      throw new ThoughtDomainError('Invalid Thought persistence shape.', props)
    }
  },
}
