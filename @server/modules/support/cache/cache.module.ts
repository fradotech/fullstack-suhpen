import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { config } from '@server/config'
import { CacheService } from './infrastructure/cache.service'

@Module({
  imports: [CacheModule.register(config.cache.register)],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class AppCacheModule {}
