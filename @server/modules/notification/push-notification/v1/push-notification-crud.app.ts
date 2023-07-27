import { Injectable } from '@nestjs/common'
import { NotificationCategoryService } from '../../notification-category/infrastructure/notification-category.service'
import { IPushNotification } from '../infrastructure/push-notification.interface'
import { PushNotificationService } from '../infrastructure/push-notification.service'
import {
  PushNotificationCreateRequest,
  PushNotificationUpdateRequest,
} from './push-notification.request'

@Injectable()
export class PushNotificationCrudApp {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {}

  async find(): Promise<IPushNotification[]> {
    return await this.pushNotificationService.find()
  }

  async create(req: PushNotificationCreateRequest): Promise<IPushNotification> {
    const data = PushNotificationCreateRequest.dto(req)

    if (req.categoryId) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        id: req.categoryId,
      })
    }

    return await this.pushNotificationService.save(data)
  }

  async findOneOrFail(id: string): Promise<IPushNotification> {
    return await this.pushNotificationService.findOneWithCategory(id)
  }

  async update(
    id: string,
    req: PushNotificationUpdateRequest,
  ): Promise<IPushNotification> {
    const data = await this.pushNotificationService.findOneByOrFail({ id })
    const dataUpdate = PushNotificationUpdateRequest.dto(data, req)

    if (req.categoryId) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        id: req.categoryId,
      })
    }

    return await this.pushNotificationService.save(dataUpdate)
  }

  async delete(id: string): Promise<IPushNotification> {
    const data = await this.pushNotificationService.findOneByOrFail({ id })
    await this.pushNotificationService.delete(id)
    return data
  }
}
