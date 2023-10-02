import { defaultHost } from '@server/config'
import dotenv from 'dotenv'

dotenv.config()

export const APP_CONFIG = {
  name: process.env.APP_NAME || defaultHost,
  version: process.env.APP_VERSION || '0.0.1',
  description: process.env.APP_DESCRIPTION || defaultHost,
  prefix: process.env.APP_PREFIX || '/api/v1',
}
