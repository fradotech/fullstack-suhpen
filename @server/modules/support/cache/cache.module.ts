import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { config } from '@server/config'
import { CacheService } from './infrastructure/cache.service'

@Module({
  imports: [CacheModule.register(config.cache.register)],
  controllers: [],
  providers: [
    CacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheService],
})
export class AppCacheModule {}
