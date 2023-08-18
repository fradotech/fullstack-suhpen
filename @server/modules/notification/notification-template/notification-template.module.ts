import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotificationCategoryModule } from '../notification-category/notification-category.module'
import { NotificationTemplateIndexApp } from './infrastructure/notification-template-index.app'
import { NotificationTemplate } from './infrastructure/notification-template.entity'
import { NotificationTemplateService } from './infrastructure/notification-template.service'
import { NotificationTemplateCrudApp } from './v1/notification-template-crud.app'
import { NotificationTemplateCrudController } from './v1/notification-template-crud.controller'
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
    NotificationTemplateCrudApp,
    NotificationTemplateIndexApp,
  ],
  exports: [NotificationTemplateService],
})
export class NotificationTemplateModule {}
