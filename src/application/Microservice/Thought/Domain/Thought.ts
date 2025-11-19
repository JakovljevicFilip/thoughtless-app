import { DomainEntity, ValidationResult } from "src/application/Platform/Domain/DomainEntity"
import { Notice, Style } from "src/application/Platform/Notice/Domain/Notice"

/**
 * Represents a single user thought in the system.
 * This is a business entity with internal validation logic and
 * lifecycle rules like expiration and discarding.
 */
export class ThoughtEntity extends DomainEntity<Thought> {
  static override DOMAIN_NAME = 'Thought'

  // --- Constants ---
  private static readonly THOUGHT_LIFETIME = 1000 * 60 * 60 * 24 * 7 // 7 days
  private static readonly THOUGHT_WARNING_INTERVAL = 1000 * 60 * 60 * 24 // 24h
  private static readonly THOUGHT_MAX_ACTIVE = 15
  private static readonly THOUGHT_MAX_DISCARDED = 5

  // --- Domain Rules ---
  rebuild(record: Record<string, unknown>): Thought {
    return {
      id: record.id as string,
      content: record.content as string,
      created_at: new Date(record.created_at as string),
      removed_at: record.removed_at ? new Date(record.removed_at as string) : null,
      expires_at: record.expires_at ? new Date(record.expires_at as string) : this.getExpiryDate(record.created_at as string),
      status: (record.status as Status) || Status.active,
    }
  }

  validate(records: Thought[]): ValidationResult<Thought> {
    const notices: Notice[] = []
    const valid: Thought[] = []
    const invalid: Thought[] = []

    for (const thought of records) {
      if (!thought.content.trim()) {
        invalid.push(thought)
        notices.push(new Notice('Empty Thought', 'Cannot record an empty thought', Style.danger))
      } else {
        valid.push(thought)
      }
    }

    return { notices, valid, invalid }
  }

  handleDiscard(thought: Thought, discarded: Thought[]): Thought[] {
    const updated = [...discarded, thought]
    if (updated.length > ThoughtEntity.THOUGHT_MAX_DISCARDED) {
      updated.shift() // remove oldest
    }
    return updated
  }

  handleRecord(thoughts: Thought[]): boolean {
    return thoughts.length < ThoughtEntity.THOUGHT_MAX_ACTIVE
  }

  canRecordMoreThoughts(thoughts: Thought[]): boolean {
    return thoughts.length < ThoughtEntity.THOUGHT_MAX_ACTIVE
  }

  handleList(thoughts: Thought[]): Thought[] {
    const now = Date.now()
    return thoughts.filter(t => new Date(t.expires_at).getTime() > now)
  }

  private getExpiryDate(createdAt: string): Date {
    return new Date(new Date(createdAt).getTime() + ThoughtEntity.THOUGHT_LIFETIME)
  }
}

/** Possible statuses for a Thought */
export enum Status {
  active = 'active',
  removed = 'removed',
}

/** Core Thought record type */
export interface Thought {
  id: string
  content: string
  created_at: Date
  removed_at: Date | null
  expires_at: Date
  status: Status
}
