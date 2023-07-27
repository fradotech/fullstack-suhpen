import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntNotificationCategory } from './notification-category.entity'

class NotificationCategoryIndexFilterRequest extends EntNotificationCategory {}

export class NotificationCategoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => NotificationCategoryIndexFilterRequest)
  filters?: NotificationCategoryIndexFilterRequest
}
