import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { NotificationCategory } from './notification-category.entity'

class NotificationCategoryIndexFilterRequest extends NotificationCategory {}

export class NotificationCategoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => NotificationCategoryIndexFilterRequest)
  filters?: NotificationCategoryIndexFilterRequest
}
