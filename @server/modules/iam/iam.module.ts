import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { AuthModule } from './auth/auth.module'
import { PermissionModule } from './permission/permission.module'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    AuthModule,
    PermissionModule,
    RoleModule,
    UserModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class IamModule {}
