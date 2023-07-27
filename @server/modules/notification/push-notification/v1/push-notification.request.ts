import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { IsUUID } from 'class-validator'
import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { INotificationTemplate } from '../../notification-template/infrastructure/notification-template.interface'
import { EntPushNotification } from '../infrastructure/push-notification.entity'
import { IPushNotification } from '../infrastructure/push-notification.interface'

export class PushNotificationRequest
  extends EntPushNotification
  implements IPushNotification
{
  @ApiProperty({ example: 'Test Create Notification' })
  title: string

  @ApiProperty()
  isBroadcast: boolean

  @ApiProperty()
  thumbnail?: string

  @IsUUID()
  @ApiProperty()
  categoryId: string
  categoryKey: NotificationCategoryDefaultKeyEnum

  @ApiProperty({ example: 'Test create notification message' })
  message: string

  @IsUUID()
  @ApiProperty()
  userId?: string
}

export class PushNotificationCreateRequest extends PartialType(
  PushNotificationRequest,
) {
  static dto(data: PushNotificationCreateRequest): IPushNotification {
    return Object.assign(new EntPushNotification(), data)
  }

  static dtoNotificationTemplate(
    template: INotificationTemplate,
    category: INotificationCategory,
    user: IUser,
  ): IPushNotification {
    const res = new EntPushNotification()

    res.title = template.title
    res.message = template.message
    res.category = category
    res.user = user
    res.pushAt = new Date()

    return res
  }
}

export class PushNotificationUpdateRequest extends OmitType(
  PushNotificationRequest,
  ['id', 'isBroadcast', 'userId'],
) {
  static dto(
    res: IPushNotification,
    data: PushNotificationUpdateRequest,
  ): IPushNotification {
    res.title = data.title
    res.message = data.message
    res.thumbnail = data.thumbnail

    return res
  }
}
