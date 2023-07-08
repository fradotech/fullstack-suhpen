import dotenv from 'dotenv'

dotenv.config()

export const CACHE_CONFIG = {
  ttl: 60,
  max: 100,
  isGlobal: true,
}
