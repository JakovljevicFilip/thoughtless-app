import { thoughtRules } from './Rules/thought-rules'
import { Thought } from './Thought'

import { Aggregate } from 'src/application/Platform/AggregateSchema/Domain/Aggregate'
import { ThoughtStatus } from './ValueObject/ThoughtStatus'
import { ThoughtId } from './ValueObject/ThoughtId'
import { thoughtRebuildRule } from './Rules/thought-rebuild'

export class ThoughtAggregate extends Aggregate<Thought> {
  static record(content: string, numberOfActiveThoughts: number): Thought {
    thoughtRules.canRecord(content, numberOfActiveThoughts)

    return new Thought(ThoughtId.generate(), content.trim(), new Date(), null, ThoughtStatus.ACTIVE)
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

  static alter(thought: Thought, alteredContent: string): Thought {
    thoughtRules.canAlter(thought.status, thought.created_at, alteredContent)

    return new Thought(
      thought.id,
      alteredContent.trim(),
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
