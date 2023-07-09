import { Module } from '@nestjs/common'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { UserCrudApp } from '../user/v1/user-crud.app'
import { AccountApp } from './v1/user-account.app'
import { AccountController } from './v1/user-account.controller'

@Module({
  imports: [UserModule, RoleModule],
  controllers: [AccountController],
  providers: [UserCrudApp, AccountApp],
  exports: [],
})
export class AccountModule {}
