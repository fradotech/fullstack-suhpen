import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntPushNotification } from './push-notification.entity'

class PushNotificationIndexFilterRequest extends EntPushNotification {}

export class PushNotificationIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => PushNotificationIndexFilterRequest)
  filters?: PushNotificationIndexFilterRequest
}
