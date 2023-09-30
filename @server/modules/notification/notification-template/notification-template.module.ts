import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryModule } from '../notification-category/notification-category.module'
import { NotificationTemplateIndexUsecase } from './infrastructure/notification-template-index.usecase'
import { NotificationTemplate } from './infrastructure/notification-template.entity'
import { NotificationTemplateService } from './infrastructure/notification-template.service'
import { NotificationTemplateCrudController } from './v1/notification-template-crud.controller'
import { NotificationTemplateCrudUsecase } from './v1/notification-template-crud.usecase'
import { NotificationTemplateSheetController } from './v1/sheet/notification-template-sheet.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationTemplate]),
    NotificationCategoryModule,
  ],
  controllers: [
    NotificationTemplateSheetController,
    NotificationTemplateCrudController,
  ],
  providers: [
    NotificationTemplateService,
    NotificationTemplateCrudUsecase,
    NotificationTemplateIndexUsecase,
  ],
  exports: [NotificationTemplateService],
})
export class NotificationTemplateModule {}
