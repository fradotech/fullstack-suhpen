import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { PermissionMethodEnum } from '@server/modules/iam/permission/common/permission.enum'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CacheService } from '../infrastructure/cache.service'

@Injectable()
export class AppCacheInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any> | any> {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()

    const method = request.method.toLowerCase()

    if (method !== PermissionMethodEnum.get.name) return next.handle()

    const userId = request.user?.['id']
    const path = request['_parsedOriginalUrl'].path
    const key = [userId, path]

    const value = await this.cacheService.get(key)

    if (value) return response.status(200).send(value)

    return next.handle().pipe(
      map(async (res) => {
        this.cacheService.set(key, res)
        return res
      }),
    )
  }
}
