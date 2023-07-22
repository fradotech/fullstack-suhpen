import { EntNotificationCategory } from './notification-category.entity'
import { INotificationCategory } from './notification-category.interface'

export class NotificationCategoryResponse extends EntNotificationCategory {
  permissionIds: string[]

  static dto(data: INotificationCategory): NotificationCategoryResponse {
    const res = new NotificationCategoryResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: INotificationCategory[]): NotificationCategoryResponse[] {
    return data.map((data) => this.dto(data))
  }
}
