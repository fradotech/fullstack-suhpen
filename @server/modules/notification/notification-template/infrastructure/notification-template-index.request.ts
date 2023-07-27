import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntNotificationTemplate } from './notification-template.entity'

class NotificationTemplateIndexFilterRequest extends EntNotificationTemplate {}

export class NotificationTemplateIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => NotificationTemplateIndexFilterRequest)
  filters?: NotificationTemplateIndexFilterRequest
}
