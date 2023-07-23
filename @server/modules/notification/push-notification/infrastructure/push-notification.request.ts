import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { IPushNotification } from '../../push-notification/infrastructure/push-notification.interface'
import { EntPushNotification } from './push-notification.entity'

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
