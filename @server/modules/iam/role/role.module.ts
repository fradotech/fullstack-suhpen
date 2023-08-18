import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionModule } from '../permission/permission.module'
import { RoleIndexApp } from './infrastructure/role-index.app'
import { IamRole } from './infrastructure/role.entity'
import { RoleService } from './infrastructure/role.service'
import { RoleCrudApp } from './v1/role-crud.app'
import { RoleCrudController } from './v1/role-crud.controller'
import { RoleSheetController } from './v1/sheet/role-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([IamRole]), PermissionModule],
  controllers: [RoleSheetController, RoleCrudController],
  providers: [RoleService, RoleCrudApp, RoleIndexApp],
  exports: [RoleService],
})
export class RoleModule {}
