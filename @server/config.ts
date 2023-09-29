import dotenv from 'dotenv'
import { APP_CONFIG } from './common/app.config'
import { DATABASE_CONFIG } from './database/common/database.config'
import { AUTH_CONFIG } from './modules/iam/auth/common/auth.config'
import { MAIL_CONFIG } from './modules/notification/mail/common/mail.config'
import { ATTACHMENT_CONFIG } from './modules/support/attachment/common/attachment.config'
import { CACHE_CONFIG } from './modules/support/cache/common/cache.config'
import { SENTRY_CONFIG } from './modules/support/sentry/common/sentry.config'

dotenv.config()

export const fradotech = 'fradotech'
const localhost = 'http://localhost:3000'

export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || 'local',
    port: process.env.PORT || 3000,
    host: process.env.HOST || localhost,
    hostPort: `${process.env.HOST || localhost}:${process.env.PORT || 3000}`,
    hostApi: `${process.env.HOST || localhost}${
      process.env.APP_PREFIX || '/api/v1'
    }`,

    hostClient: process.env.HOST_CLIENT || `${localhost}:8080`,
    rateLimiter: { ttl: 60, limit: 100 },
  },

  app: APP_CONFIG,
  database: DATABASE_CONFIG,
  auth: AUTH_CONFIG,
  attachment: ATTACHMENT_CONFIG,
  sentry: SENTRY_CONFIG,
  mail: MAIL_CONFIG,
  cache: CACHE_CONFIG,
}
