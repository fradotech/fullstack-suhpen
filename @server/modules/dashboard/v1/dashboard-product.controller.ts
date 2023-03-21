import { Controller, Get, UseGuards } from '@nestjs/common'
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

  @Get('buyPrice')
  async buyPrice(): Promise<IApiRes<IAggreate>> {
    const res = await this.dashboardProductApp.aggregate(this.buyPrice.name)
    return ApiRes.fromEntity(res)
  }

  @Get('sellPrice')
  async sellPrice(): Promise<IApiRes<IAggreate>> {
    const res = await this.dashboardProductApp.aggregate(this.sellPrice.name)
    return ApiRes.fromEntity(res)
  }

  @Get('marginPrice')
  async marginPrice(): Promise<IApiRes<IAggreate>> {
    const res = await this.dashboardProductApp.aggregate(this.marginPrice.name)
    return ApiRes.fromEntity(res)
  }
}
