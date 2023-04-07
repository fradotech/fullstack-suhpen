import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import '@sentry/tracing'
import { LoggerInterceptor } from './infrastructure/logger.interceptor'
import { LoggerService } from './infrastructure/logger.service'
import { LoggerIndexApp } from './v1/logger-index.app'
import { LoggerController } from './v1/logger.controller'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({
  controllers: [LoggerController],
  providers: [
    LoggerService,
    LoggerIndexApp,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class LoggerModule {}
