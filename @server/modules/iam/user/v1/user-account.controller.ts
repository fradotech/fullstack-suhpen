import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../auth/common/logged-in.guard'
import { GetUserLogged } from '../common/get-user-logged.decorator'
import { IUser } from '../infrastructure/user.interface'
import { UserUpdateRequest } from '../infrastructure/user.request'
import { UserResponse } from '../infrastructure/user.response'
import { UserCrudApp } from './user-crud.app'

const THIS_MODULE = Modules.Account

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class UserAccountController {
  constructor(private readonly userCrudApp: UserCrudApp) {}

  @Get()
  async GetUserLogged(
    @GetUserLogged() user: IUser,
  ): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.findOneOrFail(user.id)
    return ApiRes.fromEntity(UserResponse.fromEntity(data))
  }

  @Put()
  async update(
    @GetUserLogged() user: IUser,
    @Body() req: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.update(user.id, req)
    return ApiRes.fromEntity(UserResponse.fromEntity(data))
  }
}
