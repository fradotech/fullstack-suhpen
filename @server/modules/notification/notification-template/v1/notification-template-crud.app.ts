import { Injectable } from '@nestjs/common'
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
  ) {}

  async find(): Promise<INotificationTemplate[]> {
    return await this.notificationTemplateService.find()
  }

  async create(
    req: NotificationTemplateCreateRequest,
  ): Promise<INotificationTemplate> {
    const data = NotificationTemplateCreateRequest.dto(req)

    return await this.notificationTemplateService.save(data)
  }

  async findOneOrFail(id: string): Promise<INotificationTemplate> {
    return await this.notificationTemplateService.findOneByOrFail({ id })
  }

  async update(
    id: string,
    req: NotificationTemplateUpdateRequest,
  ): Promise<INotificationTemplate> {
    const data = await this.notificationTemplateService.findOneByOrFail({ id })
    const dataUpdate = NotificationTemplateUpdateRequest.dto(data, req)

    return await this.notificationTemplateService.save(dataUpdate)
  }

  async delete(id: string): Promise<INotificationTemplate> {
    const data = await this.notificationTemplateService.findOneByOrFail({ id })
    await this.notificationTemplateService.delete(id)
    return data
  }
}
