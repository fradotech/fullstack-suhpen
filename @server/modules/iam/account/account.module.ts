import { Module } from '@nestjs/common'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { UserCrudUsecase } from '../user/v1/user-crud.usecase'
import { AccountController } from './v1/user-account.controller'
import { AccountUsecase } from './v1/user-account.usecase'

@Module({
  imports: [UserModule, RoleModule],
  controllers: [AccountController],
  providers: [UserCrudUsecase, AccountUsecase],
  exports: [],
})
export class AccountModule {}
