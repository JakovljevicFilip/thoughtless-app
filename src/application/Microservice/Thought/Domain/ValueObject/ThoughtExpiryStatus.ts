/**
 * Expiry status is a domain-level classification because the decision of
 * whether a warning should exist belongs to the thought rules, not the UI.
 * The application layer is only responsible for when and how to present it.
 */
export enum ThoughtExpiryStatus {
  IDLE = 'IDLE',
  ABOUT_TO_EXPIRE = 'ABOUT_TO_EXPIRE',
  EXPIRED = 'EXPIRED',
}
