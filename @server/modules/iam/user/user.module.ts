import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { UserIndexApp } from './infrastructure/user-index.app'
import { EttUser } from './infrastructure/user.entity'
import { UserService } from './infrastructure/user.service'
import { UserAccountController } from './v1/user-account.controller'
import { UserCrudApp } from './v1/user-crud.app'
import { UserCrudController } from './v1/user-crud.controller'
import { UserExportController } from './v1/user-export.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EttUser]), AuthModule, HttpModule],
  controllers: [
    UserExportController,
    UserAccountController,
    UserCrudController,
  ],
  providers: [UserService, UserCrudApp, UserIndexApp],
  exports: [UserService],
})
export class UserModule {}
