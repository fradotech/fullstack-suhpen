import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { NotificationModule } from '@server/modules/notification/notification.module'
import { MailModule } from '../../notification/mail/mail.module'
import { UserService } from '../user/infrastructure/user.service'
import { UserModule } from '../user/user.module'
import { RoleModule } from './../role/role.module'
import { JwtModuleOption } from './common/jwt-module.config'
import { JwtStrategy } from './common/jwt.strategy'
import { AuthNotificationService } from './infrastructure/auth-notification.service'
import { AuthService } from './infrastructure/auth.service'
import { AuthApp } from './v1/auth.app'
import { AuthController } from './v1/auth.controller'
import { AuthPasswordController } from './v1/password/auth-password.controller'

@Module({
  imports: [
    UserModule,
    MailModule,
    NotificationModule,
    RoleModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtModuleOption),
  ],
  controllers: [AuthController, AuthPasswordController],
  providers: [
    UserService,
    AuthApp,
    JwtStrategy,
    AuthService,
    AuthNotificationService,
  ],
  exports: [],
})
export class AuthModule {}
