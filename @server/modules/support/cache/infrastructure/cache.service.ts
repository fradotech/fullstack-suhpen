import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key)
  }

  async set(key: string, value: any, ttl?: number): Promise<any> {
    await this.cacheManager.set(key, value, ttl || 0)
    return this.get(key)
  }

  async del(key: string): Promise<any> {
    const data = this.get(key)
    await this.cacheManager.del(key)
    return data
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset()
  }
}
