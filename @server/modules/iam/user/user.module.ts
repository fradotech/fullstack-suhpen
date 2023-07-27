import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from '../role/role.module'
import { UserIndexApp } from './infrastructure/user-index.app'
import { EntUser } from './infrastructure/user.entity'
import { UserService } from './infrastructure/user.service'
import { UserSheetController } from './v1/sheet/user-sheet.controller'
import { UserCrudApp } from './v1/user-crud.app'
import { UserCrudController } from './v1/user-crud.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EntUser]), RoleModule],
  controllers: [UserSheetController, UserCrudController],
  providers: [UserService, UserCrudApp, UserIndexApp],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
