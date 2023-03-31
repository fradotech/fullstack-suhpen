import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { InventoryModule } from './inventory/inventory.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [CategoryModule, ProductModule, InventoryModule],
  controllers: [],
  providers: [],
})
export class FeatureModule {}
