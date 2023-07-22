import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { MessageCategoryIndexApp } from '../infrastructure/message-category-index.app'
import { MessageCategoryIndexRequest } from '../infrastructure/message-category-index.request'
import { MessageCategoryResponse } from '../infrastructure/message-category.response'

const THIS_MODULE = Modules.MessageCategory + '/sheet'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class MessageCategorySheetController {
  constructor(private readonly categoryIndexApp: MessageCategoryIndexApp) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: MessageCategoryIndexRequest,
  ): Promise<IApiExportRes<MessageCategoryResponse[]>> {
    req.isExport = true
    const response = await this.categoryIndexApp.fetch(req)

    const data = MessageCategoryResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.MessageCategory
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
