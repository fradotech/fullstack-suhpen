import { Module } from '@nestjs/common'
import { MailModule } from './mail/mail.module'
import { NotificationCategoryModule } from './notification-category/notification-category.module'
import { NotificationPushModule } from './notification-push/notification-push.module'
import { NotificationTemplateModule } from './notification-template/notification-template.module'

@Module({
  imports: [
    NotificationCategoryModule,
    NotificationPushModule,
    NotificationTemplateModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    NotificationCategoryModule,
    NotificationPushModule,
    NotificationTemplateModule,
    MailModule,
  ],
})
export class NotificationModule {}
