import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EntUser } from '../user/infrastructure/user.entity'
import { UserService } from '../user/infrastructure/user.service'
import { MailModule } from './../../support/mail/mail.module'
import { JwtModuleOption } from './common/jwt-module.config'
import { JwtStrategy } from './common/jwt.strategy'
import { AuthService } from './infrastructure/auth.service'
import { AuthPasswordController } from './v1/auth-password.controller'
import { AuthApp } from './v1/auth.app'
import { AuthController } from './v1/auth.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([EntUser]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtModuleOption),
    MailModule,
  ],
  controllers: [AuthController, AuthPasswordController],
  providers: [UserService, AuthApp, JwtStrategy, AuthService],
  exports: [],
})
export class AuthModule {}
