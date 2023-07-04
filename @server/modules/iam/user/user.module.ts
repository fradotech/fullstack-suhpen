import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from '../role/role.module'
import { UserIndexApp } from './infrastructure/user-index.app'
import { EntUser } from './infrastructure/user.entity'
import { UserService } from './infrastructure/user.service'
import { UserAccountApp } from './v1/account/user-account.app'
import { UserAccountController } from './v1/account/user-account.controller'
import { UserCrudApp } from './v1/user-crud.app'
import { UserCrudController } from './v1/user-crud.controller'
import { UserSheetController } from './v1/user-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntUser]), RoleModule],
  controllers: [UserSheetController, UserAccountController, UserCrudController],
  providers: [UserService, UserCrudApp, UserIndexApp, UserAccountApp],
  exports: [],
})
export class UserModule {}
