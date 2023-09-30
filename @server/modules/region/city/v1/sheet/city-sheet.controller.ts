import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { CityIndexRequest } from '../../infrastructure/city-index.request'
import { CityIndexUsecase } from '../../infrastructure/city-index.usecase'
import { CityResponse } from '../../infrastructure/city.response'

const THIS_MODULE = Modules.CitySheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class CitySheetController {
  constructor(private readonly cityIndexUsecase: CityIndexUsecase) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: CityIndexRequest,
  ): Promise<IApiExportRes<CityResponse[]>> {
    req.isExport = true
    const response = await this.cityIndexUsecase.fetch(req)

    const data = CityResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${Modules.City} - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
