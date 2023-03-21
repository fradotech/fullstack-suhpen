import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntProduct } from '../feature/product/infrastructure/product.entity'
import { DashboardProductApp } from './v1/dashboard-product.app'
import { DashboardProductController } from './v1/dashboard-product.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntProduct])],
  controllers: [DashboardProductController],
  providers: [DashboardProductApp],
  exports: [],
})
export class DashboardModule {}
