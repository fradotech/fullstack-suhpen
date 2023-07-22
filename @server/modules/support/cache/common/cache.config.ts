import { CacheModuleOptions } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import dotenv from 'dotenv'
dotenv.config()

export const CACHE_CONFIG: { redis: CacheModuleOptions<Record<any, any>> } = {
  redis: {
    isGlobal: true,
    ttl: 1 * 1000,
    useFactory: async () => ({
      store: redisStore,
      host: process.env.CACHE_REDIS_HOST,
      port: process.env.CACHE_REDIS_PORT,
    }),
  },
}
