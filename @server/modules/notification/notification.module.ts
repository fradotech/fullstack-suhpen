import { Module } from '@nestjs/common'
import { NotificationCategoryModule } from './notification-category/message-category.module'

@Module({
  imports: [NotificationCategoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class NotificationModule {}
