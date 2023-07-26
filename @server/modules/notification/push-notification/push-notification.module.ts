import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryModule } from '../notification-category/notification-category.module'
import { PushNotificationIndexApp } from './infrastructure/push-notification-index.app'
import { EntPushNotification } from './infrastructure/push-notification.entity'
import { PushNotificationService } from './infrastructure/push-notification.service'
import { PushNotificationCrudApp } from './v1/push-notification-crud.app'
import { PushNotificationCrudController } from './v1/push-notification-crud.controller'
import { PushNotificationReadApp } from './v1/read/push-notification-read.app'
import { PushNotificationReadController } from './v1/read/push-notification-read.controller'
import { PushNotificationSheetController } from './v1/sheet/push-notification-sheet.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([EntPushNotification]),
    NotificationCategoryModule,
  ],
  controllers: [
    PushNotificationReadController,
    PushNotificationSheetController,
    PushNotificationCrudController,
  ],
  providers: [
    PushNotificationService,
    PushNotificationCrudApp,
    PushNotificationIndexApp,
    PushNotificationReadApp,
  ],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
