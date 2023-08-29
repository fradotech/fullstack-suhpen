import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { IsUUID } from 'class-validator'
import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { INotificationTemplate } from '../../notification-template/infrastructure/notification-template.interface'
import { NotificationPush } from '../infrastructure/notification-push.entity'
import { INotificationPush } from '../infrastructure/notification-push.interface'

export class NotificationPushRequest
  extends NotificationPush
  implements INotificationPush
{
  @IsUUID()
  @ApiProperty()
  categoryId: string
  categoryKey: NotificationCategoryDefaultKeyEnum

  @IsUUID()
  @ApiProperty()
  userId?: string
}

export class NotificationPushCreateRequest extends PartialType(
  NotificationPushRequest,
) {
  static dto(data: NotificationPushCreateRequest): INotificationPush {
    return Object.assign(new NotificationPush(), data)
  }

  static dtoNotificationTemplate(
    template: INotificationTemplate,
    category: INotificationCategory,
    user: IUser,
  ): INotificationPush {
    const res = new NotificationPush()

    res.title = template.title
    res.message = template.message
    res.category = category
    res.user = user
    res.pushAt = new Date()

    return res
  }
}

export class NotificationPushUpdateRequest extends OmitType(
  NotificationPushRequest,
  ['id', 'isBroadcast', 'userId'],
) {
  static dto(
    res: INotificationPush,
    data: NotificationPushUpdateRequest,
  ): INotificationPush {
    res.title = data.title
    res.message = data.message
    res.thumbnail = data.thumbnail

    return res
  }
}
