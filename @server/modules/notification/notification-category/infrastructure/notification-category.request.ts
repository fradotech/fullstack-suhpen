import { OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { EntNotificationCategory } from './notification-category.entity'
import { INotificationCategory } from './notification-category.interface'

export class NotificationCategoryRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
}

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
