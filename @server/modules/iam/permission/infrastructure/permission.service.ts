import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Router } from 'express'
import { In, Repository } from 'typeorm'
import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'
import { PermissionSyncRequest } from './permission.request'

class PermissionRepo extends Repository<EntPermission> {
  constructor(
    @InjectRepository(EntPermission)
    private readonly permissionRepo: Repository<EntPermission>,
  ) {
    super(
      permissionRepo.target,
      permissionRepo.manager,
      permissionRepo.queryRunner,
    )
  }
}

@Injectable()
export class PermissionService extends PermissionRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntPermission[]> {
    return await this.findBy({ id: In(ids) })
  }

  static findFromApp(app: NestExpressApplication): EntPermission[] {
    const server = app.getHttpServer()
    const router: Router = server._events.request._router

    const routes = router.stack
      .map((layer): IPermission => {
        return layer.route && PermissionSyncRequest.dto(layer)
      })
      .filter((item) => item)

    return routes
  }
}
