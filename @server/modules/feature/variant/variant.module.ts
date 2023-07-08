import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntProduct } from '../product/infrastructure/product.entity'
import { ProductModule } from '../product/product.module'
import { VariantIndexApp } from './infrastructure/variant-index.app'
import { EntVariant } from './infrastructure/variant.entity'
import { VariantService } from './infrastructure/variant.service'
import { VariantCrudApp } from './v1/variant-crud.app'
import { VariantCrudController } from './v1/variant-crud.controller'
import { VariantSheetController } from './v1/variant-sheet.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([EntVariant, EntProduct]),
    HttpModule,
    ProductModule,
  ],
  controllers: [VariantSheetController, VariantCrudController],
  providers: [VariantService, VariantCrudApp, VariantIndexApp],
  exports: [],
})
export class VariantModule {}
