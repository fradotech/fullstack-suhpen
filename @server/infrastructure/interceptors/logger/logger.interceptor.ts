import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Scope,
} from '@nestjs/common'
import { Util } from '@server/common/utils/util'
import { config } from '@server/config'
import fs from 'fs'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { LoggerResponse } from './logger.response'

@Injectable()
@Injectable({ scope: Scope.REQUEST })
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as Request
    const dateNow = Date.now()
    const logPath = process.cwd() + '/' + config.app.logFile

    return next.handle().pipe(
      tap(() => {
        const logRes = LoggerResponse.fromEntity(Date.now() - dateNow, req)
        const file = String(fs.readFileSync(logPath))

        if (Util.isValidJSON(file)) {
          const logFile = JSON.parse(file)
          logFile.push(logRes)

          const logFileUpdate = JSON.stringify(logFile)
          fs.writeFile(logPath, logFileUpdate, (e) => {
            e && Logger.error(e)
          })
        }
      }),
    )
  }
}
