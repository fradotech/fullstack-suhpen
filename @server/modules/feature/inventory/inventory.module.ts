import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntProduct } from '../product/infrastructure/product.entity'
import { ProductService } from '../product/infrastructure/product.service'
import { InventoryIndexApp } from './infrastructure/inventory-index.app'
import { EntInventory } from './infrastructure/inventory.entity'
import { InventoryService } from './infrastructure/inventory.service'
import { InventoryCrudApp } from './v1/inventory-crud.app'
import { InventoryCrudController } from './v1/inventory-crud.controller'
import { InventorySheetController } from './v1/inventory-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntInventory, EntProduct]), HttpModule],
  controllers: [InventorySheetController, InventoryCrudController],
  providers: [
    InventoryService,
    InventoryCrudApp,
    InventoryIndexApp,
    ProductService,
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
