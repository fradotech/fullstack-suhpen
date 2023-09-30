import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionIndexUsecase } from './infrastructure/permission-index.usecase'
import { IamPermission } from './infrastructure/permission.entity'
import { PermissionService } from './infrastructure/permission.service'
import { PermissionCrudController } from './v1/permission-crud.controller'
import { PermissionCrudUsecase } from './v1/permission-crud.usecase'
import { PermissionSheetController } from './v1/sheet/permission-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([IamPermission])],
  controllers: [PermissionSheetController, PermissionCrudController],
  providers: [PermissionService, PermissionCrudUsecase, PermissionIndexUsecase],
  exports: [PermissionService],
})
export class PermissionModule {}
