import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { RoleIndexRequest } from './role-index.request'
import { IRole } from './role.interface'
import { RoleService } from './role.service'

@Injectable()
export class RoleIndexUsecase extends BaseIndexUsecase {
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
    const relations: IIndexUsecaseRelation[] = []
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
