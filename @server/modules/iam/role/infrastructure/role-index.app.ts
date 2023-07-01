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
import { RoleIndexRequest } from './role-index.request'
import { EntRole } from './role.entity'
import { IRole } from './role.interface'

@Injectable({ scope: Scope.REQUEST })
export class RoleIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntRole)
    private readonly roleRepo: Repository<IRole>,
  ) {
    super()
  }

  async fetch(req: RoleIndexRequest): Promise<IPaginateResponse<IRole>> {
    const name = 'roles'
    const columns = ['name', 'key', 'isActive', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.roleRepo,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
