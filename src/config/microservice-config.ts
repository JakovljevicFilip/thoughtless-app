/**
 * All frontend environment variables must start with VITE_.
 * Microservice-specific configuration values.
 *
 * Usage example:
 *   import MicroserviceConfig from 'src/config/microservice-config'
 *   console.log(MicroserviceConfig.example)
 */

const MicroserviceConfig = Object.freeze({
  example: import.meta.env.VITE_MICROSERVICE_EXAMPLE ?? 'microservice-default',
  minContentLength: Number(import.meta.env.VITE_MICROSERVICE_MIN_CONTENT_LENGTH ?? 3),
  maxContentLength: Number(import.meta.env.VITE_MICROSERVICE_MAX_CONTENT_LENGTH ?? 1000),
  lifetimeDays: Number(import.meta.env.VITE_MICROSERVICE_LIFETIME_DAYS ?? 7),
  warningIntervalDays: Number(import.meta.env.VITE_MICROSERVICE_WARNING_INTERVAL_DAYS ?? 7),
  maxActive: Number(import.meta.env.VITE_MICROSERVICE_THOUGHT_MAX_ACTIVE ?? 15),
  maxDiscarded: Number(import.meta.env.VITE_MICROSERVICE_MAX_DISCARDED ?? 5),
})

export default MicroserviceConfig
