import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { UserResponse } from '../../user/infrastructure/user.response'
import {
  AuthLoginRequest,
  AuthRegisterRequest,
} from '../infrastructure/auth.request'
import { AuthApp } from './auth.app'

const THIS_MODULE = Modules.Auth

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authApp: AuthApp) {}

  @Post('login')
  async login(@Body() req: AuthLoginRequest): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.login(req)
    return ApiRes.dto(UserResponse.dto(user))
  }

  @Post('register')
  async register(
    @Body() req: AuthRegisterRequest,
  ): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.register(req)
    return ApiRes.dto(UserResponse.dto(user))
  }
}
