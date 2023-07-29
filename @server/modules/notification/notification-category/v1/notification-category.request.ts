import { PartialType } from '@nestjs/swagger'
import { EntNotificationCategory } from '../infrastructure/notification-category.entity'
import { INotificationCategory } from '../infrastructure/notification-category.interface'

export class NotificationCategoryRequest
  extends EntNotificationCategory
  implements INotificationCategory {}

export class NotificationCategoryCreateRequest extends PartialType(
  NotificationCategoryRequest,
) {
  static dto(data: NotificationCategoryCreateRequest): INotificationCategory {
    return Object.assign(new EntNotificationCategory(), data)
  }
}

export class NotificationCategoryUpdateRequest extends PartialType(
  NotificationCategoryRequest,
) {
  static dto(
    data: INotificationCategory,
    req: NotificationCategoryUpdateRequest,
  ): INotificationCategory {
    return Object.assign(data, req)
  }
}

export class NotificationCategorySyncRequest extends PartialType(
  NotificationCategoryRequest,
) {
  static dto(data: NotificationCategoryCreateRequest): INotificationCategory {
    const res = NotificationCategoryCreateRequest.dto(data)
    return res
  }
}
