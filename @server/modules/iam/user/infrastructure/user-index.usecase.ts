import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { UserIndexRequest } from './user-index.request'
import { UserService } from './user.service'

@Injectable()
export class UserIndexUsecase extends BaseIndexUsecase {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly userService: UserService,
  ) {
    super()
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IUser>> {
    const name = 'user'
    const columns = ['name', 'email', 'phoneNumber', 'createdAt']
    const relations: IIndexUsecaseRelation[] = [
      {
        name: 'roles',
        columns: ['name'],
      },
    ]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.userService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
