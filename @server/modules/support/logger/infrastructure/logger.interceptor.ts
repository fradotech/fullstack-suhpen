import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggerResponse } from './logger.response'
import { LoggerService } from './logger.service'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const dateNow = Date.now()
    const file = await this.loggerService.getFile()

    return next.handle().pipe(
      tap(() => {
        const logRes = LoggerResponse.dto(Date.now() - dateNow, request)
        this.loggerService.setFile(file, logRes)
      }),
    )
  }
}
