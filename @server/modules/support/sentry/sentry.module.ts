import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { config } from '@server/config'
import { SentryInterceptor } from './infrastructure/sentry.interceptor'
import { SentryService } from './infrastructure/sentry.service'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({
  providers: [
    SentryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
  exports: [SentryService],
})
export class SentryModule {
  static forRoot(options: Sentry.NodeOptions) {
    config.sentry.dsn && Sentry.init(options)
    return { module: SentryModule }
  }
}
