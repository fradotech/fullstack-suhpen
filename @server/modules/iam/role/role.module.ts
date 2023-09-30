import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from '../permission/permission.module'
import { RoleIndexUsecase } from './infrastructure/role-index.usecase'
import { IamRole } from './infrastructure/role.entity'
import { RoleService } from './infrastructure/role.service'
import { RoleCrudController } from './v1/role-crud.controller'
import { RoleCrudUsecase } from './v1/role-crud.usecase'
import { RoleSheetController } from './v1/sheet/role-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([IamRole]), PermissionModule],
  controllers: [RoleSheetController, RoleCrudController],
  providers: [RoleService, RoleCrudUsecase, RoleIndexUsecase],
  exports: [RoleService],
})
export class RoleModule {}
