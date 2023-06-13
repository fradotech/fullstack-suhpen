import dotenv from 'dotenv'

dotenv.config()

export const APP_CONFIG = {
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  description: process.env.APP_DESCRIPTION,
  logFile: 'app.log',
  prefix: process.env.APP_PREFIX || '/api/v1',
}
