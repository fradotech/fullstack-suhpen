import { defaultHost } from '@server/config'
import dotenv from 'dotenv'

dotenv.config()

export const DATABASE_CONFIG = {
  dialect: process.env.DB_SERVER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'frado201',
  database: process.env.DB_DATABASE || defaultHost,
}
