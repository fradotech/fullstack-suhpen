import dotenv from 'dotenv'

dotenv.config()

export const SENTRY_CONFIG = {
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  attachStacktrace: true,
  debug: false,
  environment: process.env.NODE_ENV || 'local',
  ignoreErrors: [
    'EntityNotFoundError',
    'QueryFailedError',
    'FindRelationsNotFoundError',
  ],
}
