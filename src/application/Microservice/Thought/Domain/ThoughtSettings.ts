import { AggregateSettings } from 'src/application/Platform/AggregateSchema/Domain/AggregateSettings'
import MicroserviceConfig from 'src/config/microservice-config'

export class ThoughtSettings extends AggregateSettings {
  protected static override readonly AGGREGATE_NAME = 'Thought'

  private static _MAX_CONTENT_LENGTH: number | null = null
  private static _MIN_CONTENT_LENGTH: number | null = null
  private static _LIFETIME_DAYS: number | null = null
  private static _WARNING_INTERVAL_DAYS: number | null = null
  private static _MAX_ACTIVE: number | null = null
  private static _MAX_DISCARDED: number | null = null

  private static _initialized = false

  private static init(): void {
    if (this._initialized) return
    this._initialized = true

    this._MAX_CONTENT_LENGTH = MicroserviceConfig.maxContentLength
    this._MIN_CONTENT_LENGTH = MicroserviceConfig.minContentLength
    this._LIFETIME_DAYS = MicroserviceConfig.lifetimeDays
    this._WARNING_INTERVAL_DAYS = MicroserviceConfig.warningIntervalDays
    this._MAX_ACTIVE = MicroserviceConfig.maxActive
    this._MAX_DISCARDED = MicroserviceConfig.maxDiscarded
  }

  static get maxContentLength(): number {
    this.init()
    return this.require(this._MAX_CONTENT_LENGTH, 'MAX_CONTENT_LENGTH')
  }

  static get minContentLength(): number {
    this.init()
    return this.require(this._MIN_CONTENT_LENGTH, 'MIN_CONTENT_LENGTH')
  }

  static get lifetimeDays(): number {
    this.init()
    return this.require(this._LIFETIME_DAYS, '_LIFETIME_DAYS')
  }

  static get warningIntervalDays(): number {
    this.init()
    return this.require(this._WARNING_INTERVAL_DAYS, 'WARNING_INTERVAL_DAYS')
  }

  static get maxActive(): number {
    this.init()
    return this.require(this._MAX_ACTIVE, 'MAX_ACTIVE')
  }

  static get maxDiscarded(): number {
    this.init()
    return this.require(this._MAX_DISCARDED, 'MAX_DISCARDED')
  }
}
