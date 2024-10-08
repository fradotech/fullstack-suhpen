import { Injectable } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Router } from 'express'
import { In, Repository } from 'typeorm'
import { PermissionSyncRequest } from '../v1/permission.request'
import { IamPermission } from './permission.entity'
import { IPermission } from './permission.interface'

class PermissionRepo extends Repository<IamPermission> {
  constructor(
    @InjectRepository(IamPermission)
    private readonly repo: Repository<IamPermission>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<IamPermission[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class PermissionService extends PermissionRepo {
  static findFromApp(app: NestApplication): IamPermission[] {
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
