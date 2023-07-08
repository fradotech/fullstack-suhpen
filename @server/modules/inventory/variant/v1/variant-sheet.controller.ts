import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { VariantIndexApp } from '../infrastructure/variant-index.app'
import { VariantIndexRequest } from '../infrastructure/variant-index.request'
import { VariantResponse } from '../infrastructure/variant.response'

const THIS_MODULE = Modules.Variant + '/sheet'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class VariantSheetController {
  constructor(private readonly variantIndexApp: VariantIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: VariantIndexRequest,
  ): Promise<IApiExportRes<VariantResponse[]>> {
    req.isExport = true
    const response = await this.variantIndexApp.fetch(req)

    const data = VariantResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Variant
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
