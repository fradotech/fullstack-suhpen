import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { Span, SpanContext } from '@sentry/types'
import { Request } from 'express'

@Injectable()
export class SentryService {
  constructor(@Inject(REQUEST) private request?: Request) {
    const clientFrom = request?.headers.backofficetoken
      ? 'BACKOFFICE '
      : 'MOBILE '

    const name =
      clientFrom + this.request?.route?.path || this.request?.url || 'Error'

    const transaction = Sentry.startTransaction({
      name,
      op: 'transaction',
    })

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setSpan(transaction)
      scope.setContext('http', {
        method: this.request?.method,
        url: this.request?.url,
        headers: this.request?.headers,
      })
    })
  }

  get span(): Span | undefined {
    return Sentry.getCurrentHub().getScope().getSpan()
  }

  startChild(spanContext: SpanContext): Span | undefined {
    return this.span?.startChild(spanContext)
  }
}
