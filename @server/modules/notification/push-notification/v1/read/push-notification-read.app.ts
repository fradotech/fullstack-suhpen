import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { IndexSortOderEnum } from '@server/infrastructure/index/index.interface'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Request } from 'express'
import { PushNotificationIndexApp } from '../../infrastructure/push-notification-index.app'
import { PushNotificationIndexRequest } from '../../infrastructure/push-notification-index.request'
import { IPushNotification } from '../../infrastructure/push-notification.interface'
import { PushNotificationService } from '../../infrastructure/push-notification.service'

@Injectable()
export class PushNotificationReadApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly pushNotificationIndexApp: PushNotificationIndexApp,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async fetch(): Promise<IPushNotification[]> {
    const query = new PushNotificationIndexRequest()

    query.pageSize = 1000
    query.sortField = 'createdAt'
    query.sortOrder = IndexSortOderEnum.Desc

    const res = await this.pushNotificationIndexApp.fetch(query, true)
    return res.data
  }

  async readOne(id: string): Promise<IPushNotification> {
    const data = await this.pushNotificationService.updateReadAtNow(
      [id],
      this.request.user as IUser,
    )
    return data[0]
  }

  async readMany(ids: string[]): Promise<IPushNotification[]> {
    return await this.pushNotificationService.updateReadAtNow(
      ids,
      this.request.user as IUser,
    )
  }
}
