import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { PermissionIndexRequest } from './permission-index.request'
import { IPermission } from './permission.interface'
import { PermissionService } from './permission.service'

@Injectable()
export class PermissionIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly permissionService: PermissionService,
  ) {
    super()
  }

  async fetch(
    req: PermissionIndexRequest,
  ): Promise<IPaginateResponse<IPermission>> {
    const name = 'permissions'
    const columns = [
      'name',
      'module',
      'path',
      'method',
      'isActive',
      'createdAt',
    ]
    const relations: IIndexAppRelation[] = []

    if (req.roleId) {
      relations.push({
        name: 'roles',
      })
    }

    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.permissionService,
      this.request,
    )

    if (req.roleId) {
      query.andWhere('roles.id = :roleId', { roleId: req.roleId })
    }

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
