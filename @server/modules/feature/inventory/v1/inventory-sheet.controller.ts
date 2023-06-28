import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { InventoryIndexApp } from '../infrastructure/inventory-index.app'
import { InventoryIndexRequest } from '../infrastructure/inventory-index.request'
import { InventoryResponse } from '../infrastructure/inventory.response'

const THIS_MODULE = Modules.Inventory + '/sheet'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class InventorySheetController {
  constructor(private readonly inventoryIndexApp: InventoryIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.fromEntity(true)
  }

  @Get('export')
  async fetch(
    @Query() req: InventoryIndexRequest,
  ): Promise<IApiExportRes<InventoryResponse[]>> {
    req.isExport = true
    const response = await this.inventoryIndexApp.fetch(req)

    const data = InventoryResponse.fromEntities(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Inventory
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.fromEntity(dataExport, fileName)
  }
}
