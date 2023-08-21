import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { NotificationCategoryIndexRequest } from './notification-category-index.request'
import { INotificationCategory } from './notification-category.interface'
import { NotificationCategoryService } from './notification-category.service'

@Injectable()
export class NotificationCategoryIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {
    super()
  }

  async fetch(
    req: NotificationCategoryIndexRequest,
  ): Promise<IPaginateResponse<INotificationCategory>> {
    const name = 'notificationCategory'
    const columns = ['name', 'key', 'isActive', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.notificationCategoryService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
