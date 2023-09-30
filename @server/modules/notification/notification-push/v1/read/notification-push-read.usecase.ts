import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { IndexSortOderEnum } from '@server/infrastructure/index/index.interface'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Request } from 'express'
import { NotificationPushIndexRequest } from '../../infrastructure/notification-push-index.request'
import { NotificationPushIndexUsecase } from '../../infrastructure/notification-push-index.usecase'
import { INotificationPush } from '../../infrastructure/notification-push.interface'
import { NotificationPushService } from '../../infrastructure/notification-push.service'

@Injectable()
export class NotificationPushReadUsecase {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly notificationPushIndexUsecase: NotificationPushIndexUsecase,
    private readonly notificationPushService: NotificationPushService,
  ) {}

  async fetch(): Promise<INotificationPush[]> {
    const query = new NotificationPushIndexRequest()

    query.pageSize = 1000
    query.sortField = 'createdAt'
    query.sortOrder = IndexSortOderEnum.Desc

    const res = await this.notificationPushIndexUsecase.fetch(query, true)
    return res.data
  }

  async readOne(id: string): Promise<INotificationPush> {
    const data = await this.notificationPushService.updateReadAtNow(
      [id],
      this.request.user as IUser,
    )
    return data[0]
  }

  async readMany(ids: string[]): Promise<INotificationPush[]> {
    return await this.notificationPushService.updateReadAtNow(
      ids,
      this.request.user as IUser,
    )
  }
}
