import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Request } from 'express'
import { Repository } from 'typeorm'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { UserIndexRequest } from './user-index.request'
import { EntUser } from './user.entity'

@Injectable({ scope: Scope.REQUEST })
export class UserIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntUser)
    private readonly userRepo: Repository<IUser>,
  ) {
    super()
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IUser>> {
    const tableName = 'user'
    const tableKeys = ['name', 'email', 'role', 'phoneNumber', 'createdAt']
    const relations: IIndexAppRelation[] = [
      { name: 'categories', keys: ['name'] },
    ]
    const query = this.createQueryIndex(
      req,
      this.userRepo.createQueryBuilder(tableName),
      tableName,
      tableKeys,
      relations,
      this.userRepo,
      this.request,
    )

    // TODO: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
