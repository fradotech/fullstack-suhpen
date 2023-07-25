import { OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntPushNotification } from './push-notification.entity'

export class PushNotificationIndexFilterRequest extends OmitType(
  EntPushNotification,
  ['category'],
) {
  category?: string[]
}

export class PushNotificationIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => PushNotificationIndexFilterRequest)
  filters?: PushNotificationIndexFilterRequest
}
