import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntVariant } from '../inventory/variant/infrastructure/variant.entity'
import { DashboardVariantApp } from './v1/dashboard-variant/dashboard-variant.app'
import { DashboardVariantController } from './v1/dashboard-variant/dashboard-variant.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntVariant])],
  controllers: [DashboardVariantController],
  providers: [DashboardVariantApp],
  exports: [],
})
export class DashboardModule {}
