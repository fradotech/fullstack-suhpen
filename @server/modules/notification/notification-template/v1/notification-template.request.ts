import { ApiProperty, PartialType } from '@nestjs/swagger'
import { EntNotificationTemplate } from '../infrastructure/notification-template.entity'
import { INotificationTemplate } from '../infrastructure/notification-template.interface'

export class NotificationTemplateRequest
  extends EntNotificationTemplate
  implements INotificationTemplate
{
  @ApiProperty()
  title: string

  @ApiProperty()
  message: string

  @ApiProperty()
  categoryKey: string

  @ApiProperty()
  thumbnail?: string
}

export class NotificationTemplateCreateRequest extends PartialType(
  NotificationTemplateRequest,
) {
  static dto(data: NotificationTemplateCreateRequest): INotificationTemplate {
    return Object.assign(new EntNotificationTemplate(), data)
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
