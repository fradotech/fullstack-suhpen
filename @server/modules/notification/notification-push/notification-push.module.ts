import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryModule } from '../notification-category/notification-category.module'
import { NotificationPushIndexUsecase } from './infrastructure/notification-push-index.usecase'
import { NotificationPush } from './infrastructure/notification-push.entity'
import { NotificationPushService } from './infrastructure/notification-push.service'
import { NotificationPushCrudController } from './v1/notification-push-crud.controller'
import { NotificationPushCrudUsecase } from './v1/notification-push-crud.usecase'
import { NotificationPushReadController } from './v1/read/notification-push-read.controller'
import { NotificationPushReadUsecase } from './v1/read/notification-push-read.usecase'
import { NotificationPushSheetController } from './v1/sheet/notification-push-sheet.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationPush]),
    NotificationCategoryModule,
  ],
  controllers: [
    NotificationPushReadController,
    NotificationPushSheetController,
    NotificationPushCrudController,
  ],
  providers: [
    NotificationPushService,
    NotificationPushCrudUsecase,
    NotificationPushIndexUsecase,
    NotificationPushReadUsecase,
  ],
  exports: [NotificationPushService],
})
export class NotificationPushModule {}
