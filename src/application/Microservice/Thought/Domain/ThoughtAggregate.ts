import { thoughtRules } from './Rules/thought-rules'
import { Thought } from './Thought'

import { Aggregate } from 'src/application/Platform/AggregateSchema/Domain/Aggregate'
import { ThoughtStatus } from './ValueObject/ThoughtStatus'
import { ThoughtId } from './ValueObject/ThoughtId'
import { thoughtRebuildRule } from './Rules/thought-rebuild'

export class ThoughtAggregate extends Aggregate<Thought> {
  static record(content: string, numberOfActiveThoughts: number): Thought {
    thoughtRules.canRecord(content, numberOfActiveThoughts)
    // TODO: This is temporary, bring back original createdAt
    const now = new Date()
    // 7 days - 1 minute ago
    const createdAt = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 60 * 1000)

    return new Thought(ThoughtId.generate(), content.trim(), createdAt, null, ThoughtStatus.ACTIVE)
  }

  override rebuild(
    id: string,
    content: unknown,
    created_at: unknown,
    discarded_at: unknown,
    status: unknown
  ): Thought {
    const props: {
      content: unknown
      created_at: unknown
      discarded_at: unknown
      status: unknown
    } = { content, created_at, discarded_at, status }

    thoughtRebuildRule.canRebuild(props)

    return new Thought(
      ThoughtId.fromString(id),
      props.content,
      props.created_at,
      props.discarded_at,
      ThoughtStatus.fromString(props.status)
    )
  }

  static change(thought: Thought, newContent: string): Thought {
    thoughtRules.canChange(thought.status, thought.created_at, newContent)

    return new Thought(
      thought.id,
      newContent.trim(),
      thought.created_at,
      null,
      ThoughtStatus.ACTIVE
    )
  }

  static discard(thought: Thought, numberOfDiscardedThoughts: number): Thought {
    thoughtRules.canDiscard(thought.status, numberOfDiscardedThoughts)

    return new Thought(
      thought.id,
      thought.content,
      thought.created_at,
      new Date(),
      ThoughtStatus.DISCARDED
    )
  }

  static restore(thought: Thought, numberOfActiveThoughts: number): Thought {
    thoughtRules.canRestore(thought.status, numberOfActiveThoughts)

    return new Thought(thought.id, thought.content, new Date(), null, ThoughtStatus.ACTIVE)
  }

  static remove(thought: Thought): Thought {
    thoughtRules.canRemove(thought.status)
    return thought
  }
}
