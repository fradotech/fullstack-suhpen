import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { LogActivityIndexUsecase } from '../../infrastructure/log-activity-index.usecase'
import { LogActivityResponse } from '../../infrastructure/log-activity.response'
import { LogActivityIndexRequest } from '../log-activity-index.request'

const THIS_MODULE = Modules.LogSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class LogActivitySheetController {
  constructor(
    private readonly logActivityIndexUsecase: LogActivityIndexUsecase,
  ) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: LogActivityIndexRequest,
  ): Promise<IApiExportRes<LogActivityResponse[]>> {
    req.isExport = true
    const response = await this.logActivityIndexUsecase.fetch(req)

    const data = LogActivityResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${Modules.Log} - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
