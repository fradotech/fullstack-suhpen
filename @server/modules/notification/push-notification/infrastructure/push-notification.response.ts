import { EntPushNotification } from './push-notification.entity'
import { IPushNotification } from './push-notification.interface'

export class PushNotificationResponse extends EntPushNotification {
  categoryId: string

  static dto(data: IPushNotification): PushNotificationResponse {
    const res = new PushNotificationResponse()
    Object.assign(res, data)

    res.categoryId = data.category?.id

    return res
  }

  static dtos(data: IPushNotification[]): PushNotificationResponse[] {
    return data.map((data) => this.dto(data))
  }
}
