import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { DashboardUserUsecase } from './dashboard-user.usecase'

const THIS_MODULE = Modules.DashboardUser

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class DashboardUserController {
  constructor(private readonly dashboardUserUsecase: DashboardUserUsecase) {}

  @Get('aggregate/:field')
  async aggregate(@Param('field') field: string): Promise<IApiRes<IAggreate>> {
    // TODO: Add validation field
    const res = await this.dashboardUserUsecase.aggregate(field)
    return ApiRes.dto(res)
  }
}
