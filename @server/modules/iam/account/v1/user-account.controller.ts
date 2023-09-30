import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../auth/common/logged-in.guard'
import { UserLogged } from '../../user/common/get-user-logged.decorator'
import { IUser } from '../../user/infrastructure/user.interface'
import { AccountResponse } from '../infrastructure/account.response'
import { AccountUpdateRequest } from './account.request'
import { AccountUsecase } from './user-account.usecase'

const THIS_MODULE = Modules.Account

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class AccountController {
  constructor(private readonly accountApp: AccountUsecase) {}

  @Get()
  async userLogged(
    @UserLogged() user: IUser,
  ): Promise<IApiRes<AccountResponse>> {
    const data = await this.accountApp.findOneWithRoles(user.id)
    return ApiRes.dto(AccountResponse.dto(data))
  }

  @Put()
  async update(
    @UserLogged() user: IUser,
    @Body() req: AccountUpdateRequest,
  ): Promise<IApiRes<AccountResponse>> {
    const data = await this.accountApp.update(user.id, req)
    return ApiRes.dto(AccountResponse.dto(data))
  }
}
