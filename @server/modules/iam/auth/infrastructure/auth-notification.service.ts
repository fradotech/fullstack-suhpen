import { Injectable } from '@nestjs/common'
import { IKeyValue } from '@server/infrastructure/interfaces/key-value.interface'
import { NotificationCategoryDefaultKeyEnum } from '@server/modules/notification/notification-category/common/notification-category.enum'
import { NotificationCategoryService } from '@server/modules/notification/notification-category/infrastructure/notification-category.service'
import { NotificationTemplateService } from '@server/modules/notification/notification-template/infrastructure/notification-template.service'
import { PushNotificationService } from '@server/modules/notification/push-notification/infrastructure/push-notification.service'
import { PushNotificationCreateRequest } from '@server/modules/notification/push-notification/v1/push-notification.request'
import { IUser } from '../../user/infrastructure/user.interface'
import { AuthNotificationKeyEnum } from '../common/auth.enum'

@Injectable()
export class AuthNotificationService {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
    private readonly notificationTemplateService: NotificationTemplateService,
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {}

  async sendRegister(user: IUser): Promise<void> {
    const templateFound =
      await this.notificationTemplateService.findOneByOrFail({
        key: AuthNotificationKeyEnum.Register,
      })

    const variables: IKeyValue[] = [
      {
        key: 'userName',
        value: user.name,
      },
    ]

    const template = this.notificationTemplateService.replaceVariable(
      templateFound,
      variables,
    )

    const category = await this.notificationCategoryService.findOneByOrFail({
      key: NotificationCategoryDefaultKeyEnum.Info,
    })

    const pushNotification =
      PushNotificationCreateRequest.dtoNotificationTemplate(
        template,
        category,
        user,
      )

    await this.pushNotificationService.save(pushNotification)
  }
}
