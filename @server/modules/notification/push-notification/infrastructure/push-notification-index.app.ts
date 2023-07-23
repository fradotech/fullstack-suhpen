import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { PushNotificationIndexRequest } from './push-notification-index.request'
import { IPushNotification } from './push-notification.interface'
import { PushNotificationService } from './push-notification.service'

@Injectable({ scope: Scope.REQUEST })
export class PushNotificationIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly pushNotificationService: PushNotificationService,
  ) {
    super()
  }

  async fetch(
    req: PushNotificationIndexRequest,
  ): Promise<IPaginateResponse<IPushNotification>> {
    const name = 'pushNotifications'
    const columns = ['title', 'message', 'createdAt']
    const relations: IIndexAppRelation[] = [
      {
        name: 'user',
        columns: ['name'],
      },
    ]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.pushNotificationService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
