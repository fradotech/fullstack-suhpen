import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggerResponse } from './logger.response'
import { LoggerService } from './logger.service'

@Injectable()
@Injectable({ scope: Scope.REQUEST })
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as Request
    const dateNow = Date.now()
    const file = await this.loggerService.getFile()

    return next.handle().pipe(
      tap(() => {
        const logRes = LoggerResponse.fromEntity(Date.now() - dateNow, req)
        this.loggerService.setFile(file, logRes)
      }),
    )
  }
}
