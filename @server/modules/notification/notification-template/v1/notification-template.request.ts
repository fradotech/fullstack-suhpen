import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { NotificationTemplate } from '../infrastructure/notification-template.entity'
import { INotificationTemplate } from '../infrastructure/notification-template.interface'

export class NotificationTemplateRequest
  extends NotificationTemplate
  implements INotificationTemplate
{
  @IsUUID()
  @ApiProperty()
  categoryId: string
  categoryKey: string
}

export class NotificationTemplateCreateRequest extends PartialType(
  NotificationTemplateRequest,
) {
  static dto(data: NotificationTemplateCreateRequest): INotificationTemplate {
    return Object.assign(new NotificationTemplate(), data)
  }
}

export class NotificationTemplateUpdateRequest extends PartialType(
  NotificationTemplateRequest,
) {
  static dto(
    data: INotificationTemplate,
    req: NotificationTemplateUpdateRequest,
  ): INotificationTemplate {
    return Object.assign(data, req)
  }
}

export class NotificationTemplateSyncRequest extends PartialType(
  NotificationTemplateRequest,
) {
  static dto(data: NotificationTemplateCreateRequest): INotificationTemplate {
    const res = NotificationTemplateCreateRequest.dto(data)
    return res
  }
}
