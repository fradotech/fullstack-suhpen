import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LogActivityResponse } from './log-activity.response'
import { LogActivityService } from './log-activity.service'

@Injectable()
export class LogActivityInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LogActivityService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const dateNow = Date.now()

    const logRes = LogActivityResponse.dto(Date.now() - dateNow, request)
    this.loggerService.save(logRes)

    return next.handle().pipe(
      tap(() => {
        const logRes = LogActivityResponse.dto(Date.now() - dateNow, request)
        this.loggerService.save(logRes)
      }),
    )
  }
}
