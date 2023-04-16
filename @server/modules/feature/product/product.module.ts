import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductIndexApp } from './infrastructure/product-index.app'
import { EntProduct } from './infrastructure/product.entity'
import { ProductService } from './infrastructure/product.service'
import { ProductCrudApp } from './v1/product-crud.app'
import { ProductCrudController } from './v1/product-crud.controller'
import { ProductSheetController } from './v1/product-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntProduct])],
  controllers: [ProductSheetController, ProductCrudController],
  providers: [ProductService, ProductCrudApp, ProductIndexApp],
  exports: [ProductService],
})
export class ProductModule {}
