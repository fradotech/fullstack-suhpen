import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageCategoryIndexApp } from './infrastructure/message-category-index.app'
import { EntMessageCategory } from './infrastructure/message-category.entity'
import { MessageCategoryService } from './infrastructure/message-category.service'
import { MessageCategoryCrudApp } from './v1/message-category-crud.app'
import { MessageCategoryCrudController } from './v1/message-category-crud.controller'
import { MessageCategorySheetController } from './v1/message-category-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntMessageCategory])],
  controllers: [MessageCategorySheetController, MessageCategoryCrudController],
  providers: [
    MessageCategoryService,
    MessageCategoryCrudApp,
    MessageCategoryIndexApp,
  ],
  exports: [MessageCategoryService],
})
export class MessageCategoryModule {}
