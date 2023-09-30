import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from '../role/role.module'
import { UserIndexUsecase } from './infrastructure/user-index.usecase'
import { IamUser } from './infrastructure/user.entity'
import { UserService } from './infrastructure/user.service'
import { UserSheetController } from './v1/sheet/user-sheet.controller'
import { UserCrudController } from './v1/user-crud.controller'
import { UserCrudUsecase } from './v1/user-crud.usecase'

@Module({
  imports: [TypeOrmModule.forFeature([IamUser]), RoleModule],
  controllers: [UserSheetController, UserCrudController],
  providers: [UserService, UserCrudUsecase, UserIndexUsecase],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
