import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { NotificationCategoryIndexRequest } from './notification-category-index.request'
import { INotificationCategory } from './notification-category.interface'
import { NotificationCategoryService } from './notification-category.service'

@Injectable()
export class NotificationCategoryIndexUsecase extends BaseIndexUsecase {
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
    const relations: IIndexUsecaseRelation[] = []
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
