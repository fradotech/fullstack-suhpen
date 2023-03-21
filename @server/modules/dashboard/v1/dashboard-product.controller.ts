import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { IAggreate } from '../infrastructure/dashboard.interface'
import { DashboardProductApp } from './dashboard-product.app'

const THIS_MODULE = Modules.Dashboard + '/' + Modules.Product

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class DashboardProductController {
  constructor(private readonly dashboardProductApp: DashboardProductApp) {}

  @Get('aggregate/:field')
  async aggregate(@Param('field') field: string): Promise<IApiRes<IAggreate>> {
    // TODO: Add validation field
    const res = await this.dashboardProductApp.aggregate(field)
    return ApiRes.fromEntity(res)
  }
}
