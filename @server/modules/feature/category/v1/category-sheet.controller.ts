import { Parser } from '@json2csv/plainjs'
import { Controller, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { CategoryIndexApp } from '../infrastructure/category-index.app'
import { CategoryIndexRequest } from '../infrastructure/category-index.request'
import { CategoryResponse } from '../infrastructure/category.response'

const THIS_MODULE = Modules.Category + '/sheet'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class CategorySheetController {
  constructor(private readonly userIndexApp: CategoryIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.fromEntity(true)
  }

  @Post('export')
  async fetch(
    @Query() req: CategoryIndexRequest,
  ): Promise<IApiExportRes<CategoryResponse[]>> {
    req.isExport = true
    const response = await this.userIndexApp.fetch(req)

    const data = CategoryResponse.fromEntities(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Category
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.fromEntity(dataExport, fileName)
  }
}
