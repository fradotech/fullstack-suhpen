import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PushNotificationIndexApp } from './infrastructure/push-notification-index.app'
import { EntPushNotification } from './infrastructure/push-notification.entity'
import { PushNotificationService } from './infrastructure/push-notification.service'
import { PushNotificationCrudApp } from './v1/push-notification-crud.app'
import { PushNotificationCrudController } from './v1/push-notification-crud.controller'
import { PushNotificationSheetController } from './v1/push-notification-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntPushNotification])],
  controllers: [
    PushNotificationSheetController,
    PushNotificationCrudController,
  ],
  providers: [
    PushNotificationService,
    PushNotificationCrudApp,
    PushNotificationIndexApp,
  ],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
