import * as redisStore from 'cache-manager-redis-store'
import dotenv from 'dotenv'
dotenv.config()

const redis = {
  host: process.env.CACHE_REDIS_HOST,
  port: process.env.CACHE_REDIS_PORT,
}

export const CACHE_CONFIG = {
  register: {
    isGlobal: true,
    ttl: 2 * 1000,
    useFactory: async () => ({ store: redisStore, ...redis }),
  },
  redis,
}
