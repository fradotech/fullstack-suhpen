import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { ProvinceIndexApp } from '../../infrastructure/province-index.app'
import { ProvinceIndexRequest } from '../../infrastructure/province-index.request'
import { ProvinceResponse } from '../../infrastructure/province.response'

const THIS_MODULE = Modules.ProvinceSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class ProvinceSheetController {
  constructor(private readonly roleIndexApp: ProvinceIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: ProvinceIndexRequest,
  ): Promise<IApiExportRes<ProvinceResponse[]>> {
    req.isExport = true
    const response = await this.roleIndexApp.fetch(req)

    const data = ProvinceResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Province
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
