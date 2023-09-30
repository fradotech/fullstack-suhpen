import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryIndexUsecase } from './infrastructure/notification-category-index.usecase'
import { NotificationCategory } from './infrastructure/notification-category.entity'
import { NotificationCategoryService } from './infrastructure/notification-category.service'
import { NotificationCategoryCrudController } from './v1/notification-category-crud.controller'
import { NotificationCategoryCrudUsecase } from './v1/notification-category-crud.usecase'
import { NotificationCategorySheetController } from './v1/sheet/notification-category-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([NotificationCategory])],
  controllers: [
    NotificationCategorySheetController,
    NotificationCategoryCrudController,
  ],
  providers: [
    NotificationCategoryService,
    NotificationCategoryCrudUsecase,
    NotificationCategoryIndexUsecase,
  ],
  exports: [NotificationCategoryService],
})
export class NotificationCategoryModule {}
