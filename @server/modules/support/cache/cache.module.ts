import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { config } from '@server/config'
import { AppCacheInterceptor } from './common/cache.interceptor'
import { CacheService } from './infrastructure/cache.service'

@Module({
  imports: [CacheModule.register(config.cache)],
  controllers: [],
  providers: [
    CacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppCacheInterceptor,
    },
  ],
  exports: [CacheService],
})
export class AppCacheModule {}
