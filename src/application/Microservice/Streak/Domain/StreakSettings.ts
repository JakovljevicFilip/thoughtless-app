import { AggregateSettings } from 'src/application/Platform/AggregateSchema/Domain/AggregateSettings'
import MicroserviceConfig from 'src/config/microservice-config'

export class StreakSettings extends AggregateSettings {
  protected static override readonly AGGREGATE_NAME = 'Streak'

  // Row id is required by Dexie client.
  // Value has to be a UUID string.
  private static _STREAK_ROW_ID: string
  private static _DAILY_GOAL: number | null = null

  private static _initialized = false

  private static init(): void {
    if (this._initialized) return
    this._initialized = true

    this._STREAK_ROW_ID = '0b86236a-834f-472d-a700-8f7abf2628dd'
    this._DAILY_GOAL = MicroserviceConfig.streakDailyGoal
  }

  static get streakRowId(): string {
    this.init()
    return this.require(this._STREAK_ROW_ID, 'STREAK_ROW_ID')
  }

  static get dailyGoal(): number {
    this.init()
    return this.require(this._DAILY_GOAL, 'DAILY_GOAL')
  }
}
