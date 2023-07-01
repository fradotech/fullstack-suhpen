import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { PermissionIndexRequest } from './permission-index.request'
import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

@Injectable({ scope: Scope.REQUEST })
export class PermissionIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntPermission)
    private readonly permissionRepo: Repository<IPermission>,
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
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.permissionRepo,
      this.request,
    )

    // TODO: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
