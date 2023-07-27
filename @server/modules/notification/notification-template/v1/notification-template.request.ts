import { ApiProperty, PartialType } from '@nestjs/swagger'
import { KeyValueType } from '@server/infrastructure/interfaces/key-value.interface'
import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator'
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

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => KeyValueType)
  @ApiProperty({ example: [{ key: 'customerName', value: 'Customer' }] })
  variables: KeyValueType[]

  @ApiProperty()
  categoryId: string

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
