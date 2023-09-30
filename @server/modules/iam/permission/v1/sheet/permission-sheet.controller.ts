import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../../auth/common/logged-in.guard'
import { PermissionIndexRequest } from '../../infrastructure/permission-index.request'
import { PermissionIndexUsecase } from '../../infrastructure/permission-index.usecase'
import { PermissionResponse } from '../../infrastructure/permission.response'

const THIS_MODULE = Modules.PermissionSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class PermissionSheetController {
  constructor(
    private readonly permissionIndexUsecase: PermissionIndexUsecase,
  ) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: PermissionIndexRequest,
  ): Promise<IApiExportRes<PermissionResponse[]>> {
    req.isExport = true
    const response = await this.permissionIndexUsecase.fetch(req)

    const data = PermissionResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Permission
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
