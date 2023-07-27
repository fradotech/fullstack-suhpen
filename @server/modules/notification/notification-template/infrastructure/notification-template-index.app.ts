import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { NotificationTemplateIndexRequest } from './notification-template-index.request'
import { INotificationTemplate } from './notification-template.interface'
import { NotificationTemplateService } from './notification-template.service'

@Injectable()
export class NotificationTemplateIndexApp extends BaseIndexApp {
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
    const name = 'notificationTemplates'
    const columns = ['variables', 'message', 'createdAt']
    const relations: IIndexAppRelation[] = [
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
