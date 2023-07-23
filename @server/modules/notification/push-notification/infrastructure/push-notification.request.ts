import { ApiProperty, PartialType } from '@nestjs/swagger'
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
  thumbnail?: string

  @ApiProperty()
  @IsUUID()
  categoryId: string

  @ApiProperty({ example: 'Test create notification message' })
  message: string

  @ApiProperty()
  @IsUUID()
  userId?: string
}

export class PushNotificationCreateRequest extends PartialType(
  PushNotificationRequest,
) {
  static dto(data: PushNotificationCreateRequest): IPushNotification {
    return Object.assign(new EntPushNotification(), data)
  }
}

export class PushNotificationUpdateRequest extends PartialType(
  PushNotificationRequest,
) {
  static dto(
    data: IPushNotification,
    req: PushNotificationUpdateRequest,
  ): IPushNotification {
    return Object.assign(data, req)
  }
}
