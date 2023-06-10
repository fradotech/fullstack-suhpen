import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { config } from '@server/config'
import { SentryInterceptor } from './infrastructure/sentry.interceptor'
import { SentryService } from './infrastructure/sentry.service'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({ providers: [SentryService] })
export class SentryModule {
  static forRoot() {
    const options = config.sentry.dsn && {
      dsn: config.sentry.dsn,
      attachStacktrace: true,
      debug: false,
      environment: config.server.nodeEnv,
      tracesSampleRate: config.sentry.tracesSampleRate,
      ignoreErrors: [
        'EntityNotFoundError',
        'QueryFailedError',
        'FindRelationsNotFoundError',
      ],
    }

    Sentry.init(options)

    return {
      module: SentryModule,
      providers: [
        SentryService,
        {
          provide: SENTRY_OPTIONS,
          useValue: options,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: SentryInterceptor,
        },
      ],
      exports: [SentryService],
    }
  }
}
