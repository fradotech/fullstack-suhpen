import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryIndexApp } from './infrastructure/category-index.app'
import { EntCategory } from './infrastructure/category.entity'
import { CategoryService } from './infrastructure/category.service'
import { CategoryCrudApp } from './v1/category-crud.app'
import { CategoryCrudController } from './v1/category-crud.controller'
import { CategorySheetController } from './v1/category-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntCategory])],
  controllers: [CategorySheetController, CategoryCrudController],
  providers: [CategoryService, CategoryCrudApp, CategoryIndexApp],
  exports: [CategoryService],
})
export class CategoryModule {}
