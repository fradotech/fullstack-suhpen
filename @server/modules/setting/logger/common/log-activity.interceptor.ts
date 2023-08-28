import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LogActivityService } from '../infrastructure/log-activity.service'
import { LogActivityCreateRequest } from '../v1/log-activity.request'

@Injectable()
export class LogActivityInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LogActivityService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const dateNow = Date.now()

    return next.handle().pipe(
      tap(() => {
        const logRes = LogActivityCreateRequest.dto(
          Date.now() - dateNow,
          request,
        )
        this.loggerService.save(logRes)
      }),
    )
  }
}
