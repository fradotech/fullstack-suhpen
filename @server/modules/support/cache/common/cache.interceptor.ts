import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager'
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PermissionMethodEnum } from '@server/modules/iam/permission/common/permission.enum'
import { Request } from 'express'
import { Observable, tap } from 'rxjs'
import { CacheService } from '../infrastructure/cache.service'

@Injectable()
export class CacheClearInterceptor extends CacheInterceptor {
  constructor(private readonly cacheService: CacheService) {
    super(Inject(CACHE_MANAGER), new Reflector())
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any> | any> {
    const request = context.switchToHttp().getRequest<Request>()
    const method = request.method.toLowerCase()

    if (method === PermissionMethodEnum.Get) return next.handle()

    const userId = request.user?.['id']
    const path = request['_parsedOriginalUrl'].path
    const key = [userId, path]

    // TODO: Clear cache

    return next.handle().pipe(
      tap(async (data) => {
        this.cacheService.set(key, data)
        return data
      }),
    )
  }
}
