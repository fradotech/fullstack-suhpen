import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { RoleIndexRequest } from './role-index.request'
import { IRole } from './role.interface'
import { RoleService } from './role.service'

@Injectable()
export class RoleIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly roleService: RoleService,
  ) {
    super()
  }

  async fetch(req: RoleIndexRequest): Promise<IPaginateResponse<IRole>> {
    const name = 'role'
    const columns = ['name', 'key', 'isActive', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.roleService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
