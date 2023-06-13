import dotenv from 'dotenv'

dotenv.config()

export const SENTRY_CONFIG = {
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
}
