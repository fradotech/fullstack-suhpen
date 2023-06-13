import { fradotech } from '@server/config'
import dotenv from 'dotenv'

dotenv.config()

export const DATABASE_CONFIG = {
  dialect: process.env.DB_SERVER || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || fradotech,
}
