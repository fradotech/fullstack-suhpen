import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntUser } from '../iam/user/infrastructure/user.entity'
import { DashboardUserApp } from './v1/dashboard-user/dashboard-user.app'
import { DashboardUserController } from './v1/dashboard-user/dashboard-user.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntUser])],
  controllers: [DashboardUserController],
  providers: [DashboardUserApp],
  exports: [],
})
export class DashboardModule {}
