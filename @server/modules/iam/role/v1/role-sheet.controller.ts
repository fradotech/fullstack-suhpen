import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../auth/common/logged-in.guard'
import { RoleIndexApp } from '../infrastructure/role-index.app'
import { RoleIndexRequest } from '../infrastructure/role-index.request'
import { RoleResponse } from '../infrastructure/role.response'

const THIS_MODULE = Modules.Role + '/sheet'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class RoleSheetController {
  constructor(private readonly categoryIndexApp: RoleIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: RoleIndexRequest,
  ): Promise<IApiExportRes<RoleResponse[]>> {
    req.isExport = true
    const response = await this.categoryIndexApp.fetch(req)

    const data = RoleResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${Modules.Role} - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
