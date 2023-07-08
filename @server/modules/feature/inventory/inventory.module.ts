import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntProduct } from '../product/infrastructure/product.entity'
import { ProductModule } from '../product/product.module'
import { InventoryIndexApp } from './infrastructure/inventory-index.app'
import { EntInventory } from './infrastructure/inventory.entity'
import { InventoryService } from './infrastructure/inventory.service'
import { InventoryCrudApp } from './v1/inventory-crud.app'
import { InventoryCrudController } from './v1/inventory-crud.controller'
import { InventorySheetController } from './v1/inventory-sheet.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([EntInventory, EntProduct]),
    HttpModule,
    ProductModule,
  ],
  controllers: [InventorySheetController, InventoryCrudController],
  providers: [InventoryService, InventoryCrudApp, InventoryIndexApp],
  exports: [],
})
export class InventoryModule {}
