import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryIndexApp } from './infrastructure/notification-category-index.app'
import { EntNotificationCategory } from './infrastructure/notification-category.entity'
import { NotificationCategoryService } from './infrastructure/notification-category.service'
import { NotificationCategoryCrudApp } from './v1/notification-category-crud.app'
import { NotificationCategoryCrudController } from './v1/notification-category-crud.controller'
import { NotificationCategorySheetController } from './v1/sheet/notification-category-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntNotificationCategory])],
  controllers: [
    NotificationCategorySheetController,
    NotificationCategoryCrudController,
  ],
  providers: [
    NotificationCategoryService,
    NotificationCategoryCrudApp,
    NotificationCategoryIndexApp,
  ],
  exports: [NotificationCategoryService],
})
export class NotificationCategoryModule {}
