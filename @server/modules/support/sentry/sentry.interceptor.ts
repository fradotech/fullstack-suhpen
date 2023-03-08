import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { SentryService } from './sentry.service'

@Injectable({ scope: Scope.REQUEST })
export class SentryInterceptor implements NestInterceptor {
  constructor(private sentryService: SentryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest() as Request
    const span = this.sentryService.startChild({
      op: `http.server`,
      status: 'ok',
      description: request.method + ' - ' + request.url,
    })

    return next.handle().pipe(
      finalize(() => {
        span.finish()
        this.sentryService.span.finish()
      }),
    )
  }
}
