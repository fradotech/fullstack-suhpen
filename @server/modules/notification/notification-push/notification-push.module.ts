import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryModule } from '../notification-category/notification-category.module'
import { NotificationPushIndexApp } from './infrastructure/notification-push-index.app'
import { EntNotificationPush } from './infrastructure/notification-push.entity'
import { NotificationPushService } from './infrastructure/notification-push.service'
import { NotificationPushCrudApp } from './v1/notification-push-crud.app'
import { NotificationPushCrudController } from './v1/notification-push-crud.controller'
import { NotificationPushReadApp } from './v1/read/notification-push-read.app'
import { NotificationPushReadController } from './v1/read/notification-push-read.controller'
import { NotificationPushSheetController } from './v1/sheet/notification-push-sheet.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([EntNotificationPush]),
    NotificationCategoryModule,
  ],
  controllers: [
    NotificationPushReadController,
    NotificationPushSheetController,
    NotificationPushCrudController,
  ],
  providers: [
    NotificationPushService,
    NotificationPushCrudApp,
    NotificationPushIndexApp,
    NotificationPushReadApp,
  ],
  exports: [NotificationPushService],
})
export class NotificationPushModule {}
