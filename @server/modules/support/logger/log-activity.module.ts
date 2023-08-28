import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogActivity } from './infrastructure/log-activity.entity'
import { LogActivityInterceptor } from './infrastructure/log-activity.interceptor'
import { LogActivityService } from './infrastructure/log-activity.service'
import { LogActivityIndexApp } from './v1/log-activity-index.app'
import { LogActivityController } from './v1/log-activity.controller'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({
  imports: [TypeOrmModule.forFeature([LogActivity])],
  controllers: [LogActivityController],
  providers: [
    LogActivityService,
    LogActivityIndexApp,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogActivityInterceptor,
    },
  ],
})
export class LogActivityModule {}
