import { Parser } from '@json2csv/plainjs'
import { Controller, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { ProductIndexApp } from '../infrastructure/product-index.app'
import { ProductIndexRequest } from '../infrastructure/product-index.request'
import { ProductResponse } from '../infrastructure/product.response'

const THIS_MODULE = Modules.Product + '/sheet'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class ProductSheetController {
  constructor(private readonly productIndexApp: ProductIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.fromEntity(true)
  }

  @Post('export')
  async fetch(
    @Query() req: ProductIndexRequest,
  ): Promise<IApiExportRes<ProductResponse[]>> {
    req.isExport = true
    const response = await this.productIndexApp.fetch(req)

    const data = ProductResponse.fromEntities(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Product
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.fromEntity(dataExport, fileName)
  }
}
