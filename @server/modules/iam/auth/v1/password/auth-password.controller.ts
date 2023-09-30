import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { UserResponse } from '../../../user/infrastructure/user.response'
import {
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
} from '../auth.request'
import { AuthUsecase } from '../auth.usecase'

const THIS_MODULE = Modules.Auth + '/password'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
export class AuthPasswordController {
  constructor(private readonly authApp: AuthUsecase) {}

  @Post('send')
  async send(
    @Body() req: AuthPasswordSendRequest,
  ): Promise<IApiRes<UserResponse>> {
    const link = await this.authApp.passwordSendLink(req)
    return ApiRes.dto(link)
  }

  @Get(':token')
  async token(@Param('token') token: string): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.passwordGetLink(token)
    return ApiRes.dto(user)
  }

  @Patch('change')
  async change(
    @Body() req: AuthPasswordChangeRequest,
  ): Promise<IApiRes<UserResponse>> {
    const user = await this.authApp.passwordChange(req)
    return ApiRes.dto(user)
  }
}
