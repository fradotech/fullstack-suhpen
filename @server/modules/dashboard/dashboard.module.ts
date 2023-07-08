import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntInventory } from '../feature/inventory/infrastructure/inventory.entity'
import { DashboardInventoryApp } from './v1/dashboard-inventory/dashboard-inventory.app'
import { DashboardInventoryController } from './v1/dashboard-inventory/dashboard-inventory.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntInventory])],
  controllers: [DashboardInventoryController],
  providers: [DashboardInventoryApp],
  exports: [],
})
export class DashboardModule {}
