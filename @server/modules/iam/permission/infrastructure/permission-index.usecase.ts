import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { PermissionIndexRequest } from './permission-index.request'
import { IPermission } from './permission.interface'
import { PermissionService } from './permission.service'

@Injectable()
export class PermissionIndexUsecase extends BaseIndexUsecase {
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
    const name = 'permission'
    const columns = [
      'name',
      'key',
      'module',
      'path',
      'method',
      'isActive',
      'createdAt',
    ]
    const relations: IIndexUsecaseRelation[] = []

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
