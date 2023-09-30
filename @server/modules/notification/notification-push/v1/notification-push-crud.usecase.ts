import { Injectable } from '@nestjs/common'
import { IBaseCrudUsecase } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { NotificationCategoryService } from '../../notification-category/infrastructure/notification-category.service'
import { INotificationPush } from '../infrastructure/notification-push.interface'
import { NotificationPushService } from '../infrastructure/notification-push.service'
import {
  NotificationPushCreateRequest,
  NotificationPushUpdateRequest,
} from './notification-push.request'

@Injectable()
export class NotificationPushCrudUsecase
  implements Exactly<IBaseCrudUsecase, NotificationPushCrudUsecase>
{
  constructor(
    private readonly notificationPushService: NotificationPushService,
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {}

  async find(): Promise<INotificationPush[]> {
    return await this.notificationPushService.find()
  }

  async create(req: NotificationPushCreateRequest): Promise<INotificationPush> {
    const data = NotificationPushCreateRequest.dto(req)

    if (req.categoryId) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        id: req.categoryId,
      })
    }

    return await this.notificationPushService.save(data)
  }

  async findOneOrFail(id: string): Promise<INotificationPush> {
    return await this.notificationPushService.findOneWithCategory(id)
  }

  async update(
    id: string,
    req: NotificationPushUpdateRequest,
  ): Promise<INotificationPush> {
    const data = await this.notificationPushService.findOneByOrFail({ id })
    const dataUpdate = NotificationPushUpdateRequest.dto(data, req)

    if (req.categoryId) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        id: req.categoryId,
      })
    }

    return await this.notificationPushService.save(dataUpdate)
  }

  async delete(id: string): Promise<INotificationPush> {
    const data = await this.notificationPushService.findOneByOrFail({ id })
    await this.notificationPushService.delete(id)
    return data
  }
}
