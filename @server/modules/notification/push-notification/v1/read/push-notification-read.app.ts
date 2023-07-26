import { Injectable } from '@nestjs/common'
import { IPushNotification } from '../../infrastructure/push-notification.interface'
import { PushNotificationService } from '../../infrastructure/push-notification.service'

@Injectable()
export class PushNotificationReadApp {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  async readOne(id: string): Promise<IPushNotification> {
    const data = await this.pushNotificationService.updateReadAtNow([id])
    return data[0]
  }

  async readMany(ids: string[]): Promise<IPushNotification[]> {
    return await this.pushNotificationService.updateReadAtNow(ids)
  }
}
