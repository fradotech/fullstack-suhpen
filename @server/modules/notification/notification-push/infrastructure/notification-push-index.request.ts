import { OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { NotificationPush } from './notification-push.entity'

export class NotificationPushIndexFilterRequest extends OmitType(
  NotificationPush,
  ['category'],
) {
  category?: string[]
}

export class NotificationPushIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => NotificationPushIndexFilterRequest)
  filters?: NotificationPushIndexFilterRequest
}
