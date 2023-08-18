import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionIndexApp } from './infrastructure/permission-index.app'
import { IamPermission } from './infrastructure/permission.entity'
import { PermissionService } from './infrastructure/permission.service'
import { PermissionCrudApp } from './v1/permission-crud.app'
import { PermissionCrudController } from './v1/permission-crud.controller'
import { PermissionSheetController } from './v1/sheet/permission-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([IamPermission])],
  controllers: [PermissionSheetController, PermissionCrudController],
  providers: [PermissionService, PermissionCrudApp, PermissionIndexApp],
  exports: [PermissionService],
})
export class PermissionModule {}
