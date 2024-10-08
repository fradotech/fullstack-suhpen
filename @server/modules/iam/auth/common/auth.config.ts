import { defaultHost } from '@server/config'
import dotenv from 'dotenv'

dotenv.config()

export const AUTH_CONFIG = {
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || defaultHost,
    expiredInseconds: process.env.JWT_EXPIRED_IN_SECONDS || 604800,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
}
