import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { config } from '@server/config'
import { SentryInterceptor } from './sentry.interceptor'
import { SentryService } from './sentry.service'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({ providers: [SentryService] })
export class SentryModule {
  static forRoot() {
    const options = config.sentry.dsn && {
      dsn: config.sentry.dsn,
      attachStacktrace: true,
      debug: false,
      environment: config.server.nodeEnv,
      ignoreErrors: [
        'EntityNotFoundError',
        'QueryFailedError',
        'FindRelationsNotFoundError',
      ],
      tracesSampleRate: 1.0,
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
