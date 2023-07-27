import { Module } from '@nestjs/common'
import { MailModule } from './mail/mail.module'
import { NotificationCategoryModule } from './notification-category/notification-category.module'
import { NotificationTemplateModule } from './notification-template/notification-template.module'
import { PushNotificationModule } from './push-notification/push-notification.module'

@Module({
  imports: [
    NotificationCategoryModule,
    PushNotificationModule,
    NotificationTemplateModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class NotificationModule {}
