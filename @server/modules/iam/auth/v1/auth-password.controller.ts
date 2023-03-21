import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { UserResponse } from '../../user/infrastructure/user.response'
import {
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
} from '../infrastructure/auth.request'
import { AuthApp } from './auth.app'

const THIS_MODULE = Modules.Auth + '/password'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
export class AuthPasswordController {
  constructor(private readonly authApp: AuthApp) {}

  @Post('send')
  async send(
    @Body() req: AuthPasswordSendRequest,
  ): Promise<IApiRes<UserResponse>> {
    const link = await this.authApp.passwordSendLink(req)
    return ApiRes.fromEntity(link)
  }

  @Get(':token')
  async token(@Param('token') token: string): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.passwordGetLink(token)
    return ApiRes.fromEntity(user)
  }

  @Patch('change')
  async change(
    @Body() req: AuthPasswordChangeRequest,
  ): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.passwordChange(req)
    return ApiRes.fromEntity(user)
  }
}
