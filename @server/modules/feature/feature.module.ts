import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { InventoryModule } from './inventory/inventory.module'
import { ProductModule } from './product/product.module'

@Module({
  imports: [InventoryModule, ProductModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class FeatureModule {}
