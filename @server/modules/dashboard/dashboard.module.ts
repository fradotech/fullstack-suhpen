import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IamUser } from '../iam/user/infrastructure/user.entity'
import { DashboardUserController } from './v1/dashboard-user/dashboard-user.controller'
import { DashboardUserUsecase } from './v1/dashboard-user/dashboard-user.usecase'

@Module({
  imports: [TypeOrmModule.forFeature([IamUser])],
  controllers: [DashboardUserController],
  providers: [DashboardUserUsecase],
  exports: [],
})
export class DashboardModule {}
