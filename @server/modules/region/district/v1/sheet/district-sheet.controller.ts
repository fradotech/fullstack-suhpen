import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { DistrictIndexApp } from '../../infrastructure/district-index.app'
import { DistrictIndexRequest } from '../../infrastructure/district-index.request'
import { DistrictResponse } from '../../infrastructure/district.response'

const THIS_MODULE = Modules.DistrictSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class DistrictSheetController {
  constructor(private readonly districtIndexApp: DistrictIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: DistrictIndexRequest,
  ): Promise<IApiExportRes<DistrictResponse[]>> {
    req.isExport = true
    const response = await this.districtIndexApp.fetch(req)

    const data = DistrictResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.District
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
