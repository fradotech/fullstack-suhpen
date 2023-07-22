import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string | string[]): Promise<any> {
    key = String(key)
    return await this.cacheManager.get(key)
  }

  async set(key: string | string[], value: any, ttl?: number): Promise<any> {
    key = String(key)
    await this.cacheManager.set(key, value, ttl)
    return value
  }

  async del(key: string | string[]): Promise<any> {
    key = String(key)
    const data = this.get(key)
    await this.cacheManager.del(key)
    return data
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset()
  }
}
