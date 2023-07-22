import { Module } from '@nestjs/common'
import { MailModule } from './mail/mail.module'
import { NotificationCategoryModule } from './notification-category/message-category.module'

@Module({
  imports: [NotificationCategoryModule, MailModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class NotificationModule {}
