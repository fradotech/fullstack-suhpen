import { Injectable } from '@nestjs/common'
import { NotificationCategoryService } from '../../notification-category/infrastructure/notification-category.service'
import { INotificationTemplate } from '../infrastructure/notification-template.interface'
import { NotificationTemplateService } from '../infrastructure/notification-template.service'
import {
  NotificationTemplateCreateRequest,
  NotificationTemplateUpdateRequest,
} from './notification-template.request'

@Injectable()
export class NotificationTemplateCrudApp {
  constructor(
    private readonly notificationTemplateService: NotificationTemplateService,
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {}

  async find(): Promise<INotificationTemplate[]> {
    return await this.notificationTemplateService.find()
  }

  async create(
    req: NotificationTemplateCreateRequest,
  ): Promise<INotificationTemplate> {
    const data = NotificationTemplateCreateRequest.dto(req)

    if (req.categoryId) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        id: req.categoryId,
      })
    }

    if (req.categoryKey) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        key: req.categoryKey,
      })
    }

    return await this.notificationTemplateService.save(data)
  }

  async findOneOrFail(id: string): Promise<INotificationTemplate> {
    return await this.notificationTemplateService.findOneWithCategory(id)
  }

  async update(
    id: string,
    req: NotificationTemplateUpdateRequest,
  ): Promise<INotificationTemplate> {
    const data = await this.notificationTemplateService.findOneByOrFail({ id })
    const dataUpdate = NotificationTemplateUpdateRequest.dto(data, req)

    if (req.categoryId) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        id: req.categoryId,
      })
    }

    if (req.categoryKey) {
      data.category = await this.notificationCategoryService.findOneByOrFail({
        key: req.categoryKey,
      })
    }

    return await this.notificationTemplateService.save(dataUpdate)
  }

  async delete(id: string): Promise<INotificationTemplate> {
    const data = await this.notificationTemplateService.findOneByOrFail({ id })
    await this.notificationTemplateService.delete(id)
    return data
  }
}
