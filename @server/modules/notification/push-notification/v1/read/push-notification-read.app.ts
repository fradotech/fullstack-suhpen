import { Get, Injectable, Param } from '@nestjs/common'
import { IndexSortOderEnum } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { PushNotificationIndexApp } from '../../infrastructure/push-notification-index.app'
import { PushNotificationIndexRequest } from '../../infrastructure/push-notification-index.request'
import { IPushNotification } from '../../infrastructure/push-notification.interface'
import { PushNotificationResponse } from '../../infrastructure/push-notification.response'
import { PushNotificationService } from '../../infrastructure/push-notification.service'
import { PushNotificationCrudApp } from '../push-notification-crud.app'

@Injectable()
export class PushNotificationReadApp {
  constructor(
    private readonly pushNotificationIndexApp: PushNotificationIndexApp,
    private readonly pushNotificationService: PushNotificationService,
    private readonly pushNotificationCrudApp: PushNotificationCrudApp,
  ) {}

  async fetch(): Promise<IPushNotification[]> {
    const query = new PushNotificationIndexRequest()

    query.pageSize = 1000
    query.sortField = 'createdAt'
    query.sortOrder = IndexSortOderEnum.Desc

    const res = await this.pushNotificationIndexApp.fetch(query, true)
    return res.data
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationCrudApp.findOneOrFail(id)
    return ApiRes.dto(PushNotificationResponse.dto(data))
  }

  async readOne(id: string): Promise<IPushNotification> {
    const data = await this.pushNotificationService.updateReadAtNow([id])
    return data[0]
  }

  async readMany(ids: string[]): Promise<IPushNotification[]> {
    return await this.pushNotificationService.updateReadAtNow(ids)
  }
}
