import { Injectable } from '@nestjs/common'
import { IPushNotification } from '../infrastructure/push-notification.interface'
import {
  PushNotificationCreateRequest,
  PushNotificationUpdateRequest,
} from '../infrastructure/push-notification.request'
import { PushNotificationService } from '../infrastructure/push-notification.service'

@Injectable()
export class PushNotificationCrudApp {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async find(): Promise<IPushNotification[]> {
    return await this.pushNotificationService.find()
  }

  async create(req: PushNotificationCreateRequest): Promise<IPushNotification> {
    const data = PushNotificationCreateRequest.dto(req)

    return await this.pushNotificationService.save(data)
  }

  async findOneOrFail(id: string): Promise<IPushNotification> {
    return await this.pushNotificationService.findOneByOrFail({ id })
  }

  async update(
    id: string,
    req: PushNotificationUpdateRequest,
  ): Promise<IPushNotification> {
    const data = await this.pushNotificationService.findOneByOrFail({ id })
    const dataUpdate = PushNotificationUpdateRequest.dto(data, req)

    return await this.pushNotificationService.save(dataUpdate)
  }

  async delete(id: string): Promise<IPushNotification> {
    const data = await this.pushNotificationService.findOneByOrFail({ id })
    await this.pushNotificationService.delete(id)
    return data
  }
}
