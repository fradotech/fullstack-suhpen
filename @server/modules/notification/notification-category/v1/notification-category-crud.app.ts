import { Injectable } from '@nestjs/common'
import { INotificationCategory } from '../infrastructure/notification-category.interface'
import {
  NotificationCategoryCreateRequest,
  NotificationCategoryUpdateRequest,
} from '../infrastructure/notification-category.request'
import { NotificationCategoryService } from '../infrastructure/notification-category.service'

@Injectable()
export class NotificationCategoryCrudApp {
  constructor(
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {}

  async find(): Promise<INotificationCategory[]> {
    return await this.notificationCategoryService.find()
  }

  async create(
    req: NotificationCategoryCreateRequest,
  ): Promise<INotificationCategory> {
    const data = NotificationCategoryCreateRequest.dto(req)

    return await this.notificationCategoryService.save(data)
  }

  async findOneOrFail(id: string): Promise<INotificationCategory> {
    return await this.notificationCategoryService.findOneByOrFail({ id })
  }

  async update(
    id: string,
    req: NotificationCategoryUpdateRequest,
  ): Promise<INotificationCategory> {
    const data = await this.notificationCategoryService.findOneByOrFail({ id })
    const dataUpdate = NotificationCategoryUpdateRequest.dto(data, req)

    return await this.notificationCategoryService.save(dataUpdate)
  }

  async delete(id: string): Promise<INotificationCategory> {
    const data = await this.notificationCategoryService.findOneByOrFail({ id })
    await this.notificationCategoryService.delete(id)
    return data
  }
}
