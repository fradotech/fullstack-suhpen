import { Injectable } from '@nestjs/common'
import { IKeyValue } from '@server/infrastructure/interfaces/key-value.interface'
import { NotificationCategoryDefaultKeyEnum } from '@server/modules/notification/notification-category/common/notification-category.enum'
import { NotificationCategoryService } from '@server/modules/notification/notification-category/infrastructure/notification-category.service'
import { NotificationPushService } from '@server/modules/notification/notification-push/infrastructure/notification-push.service'
import { NotificationPushCreateRequest } from '@server/modules/notification/notification-push/v1/notification-push.request'
import { NotificationTemplateService } from '@server/modules/notification/notification-template/infrastructure/notification-template.service'
import { IIamUser } from '../../user/infrastructure/user.interface'
import { AuthNotificationKeyEnum } from '../common/auth.enum'

@Injectable()
export class AuthNotificationService {
  constructor(
    private readonly notificationPushService: NotificationPushService,
    private readonly notificationTemplateService: NotificationTemplateService,
    private readonly notificationCategoryService: NotificationCategoryService,
  ) {}

  async sendRegister(user: IIamUser): Promise<void> {
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

    const notificationPush =
      NotificationPushCreateRequest.dtoNotificationTemplate(
        template,
        category,
        user,
      )

    await this.notificationPushService.save(notificationPush)
  }
}
