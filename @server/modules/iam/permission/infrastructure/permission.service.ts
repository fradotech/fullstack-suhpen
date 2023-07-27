import { Injectable } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { InjectRepository } from '@nestjs/typeorm'
import { Router } from 'express'
import { In, Repository } from 'typeorm'
import { PermissionSyncRequest } from '../v1/permission.request'
import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

class PermissionRepo extends Repository<EntPermission> {
  constructor(
    @InjectRepository(EntPermission)
    private readonly repo: Repository<EntPermission>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<EntPermission[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class PermissionService extends PermissionRepo {
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
