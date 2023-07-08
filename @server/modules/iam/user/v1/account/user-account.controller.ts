import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../../auth/common/logged-in.guard'
import { UserLogged } from '../../common/get-user-logged.decorator'
import { IUser } from '../../infrastructure/user.interface'
import { UserUpdateRequest } from '../../infrastructure/user.request'
import { UserResponse } from '../../infrastructure/user.response'
import { UserCrudApp } from '../user-crud.app'
import { UserAccountApp } from './user-account.app'

const THIS_MODULE = Modules.Account

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class UserAccountController {
  constructor(
    private readonly userAccountApp: UserAccountApp,
    private readonly userCrudApp: UserCrudApp,
  ) {}

  @Get()
  async userLogged(@UserLogged() user: IUser): Promise<IApiRes<UserResponse>> {
    const data = await this.userAccountApp.findOneWithRoles(user.id)
    return ApiRes.dto(UserResponse.dto(data))
  }

  @Put()
  async update(
    @UserLogged() user: IUser,
    @Body() req: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> {
    const data = await this.userCrudApp.update(user.id, req)
    return ApiRes.dto(UserResponse.dto(data))
  }
}
