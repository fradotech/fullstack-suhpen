import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { NotificationTemplateIndexRequest } from './notification-template-index.request'
import { INotificationTemplate } from './notification-template.interface'
import { NotificationTemplateService } from './notification-template.service'

@Injectable()
export class NotificationTemplateIndexUsecase extends BaseIndexUsecase {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly notificationTemplateService: NotificationTemplateService,
  ) {
    super()
  }

  async fetch(
    req: NotificationTemplateIndexRequest,
  ): Promise<IPaginateResponse<INotificationTemplate>> {
    const name = 'notificationTemplate'
    const columns = ['title', 'key', 'variables', 'message', 'createdAt']
    const relations: IIndexUsecaseRelation[] = [
      { name: 'category', columns: ['name'] },
    ]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.notificationTemplateService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
