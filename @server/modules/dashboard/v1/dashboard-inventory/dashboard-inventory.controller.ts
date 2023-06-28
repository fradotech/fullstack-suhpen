import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { DashboardInventoryApp } from './dashboard-inventory.app'

const THIS_MODULE = Modules.Dashboard + '/' + Modules.Inventory

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class DashboardInventoryController {
  constructor(private readonly dashboardInventoryApp: DashboardInventoryApp) {}

  @Get('aggregate/:field')
  async aggregate(@Param('field') field: string): Promise<IApiRes<IAggreate>> {
    // TODO: Add validation field
    const res = await this.dashboardInventoryApp.aggregate(field)
    return ApiRes.dto(res)
  }
}
