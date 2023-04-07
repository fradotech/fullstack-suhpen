import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import '@sentry/tracing'
import { LoggerInterceptor } from './logger.interceptor'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class LoggerModule {}
