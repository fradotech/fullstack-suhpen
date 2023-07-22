import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { MessageCategoryIndexRequest } from './message-category-index.request'
import { IMessageCategory } from './message-category.interface'
import { MessageCategoryService } from './message-category.service'

@Injectable({ scope: Scope.REQUEST })
export class MessageCategoryIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly messageCategoryService: MessageCategoryService,
  ) {
    super()
  }

  async fetch(
    req: MessageCategoryIndexRequest,
  ): Promise<IPaginateResponse<IMessageCategory>> {
    const name = 'messageCategories'
    const columns = ['name', 'key', 'isActive', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.messageCategoryService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
