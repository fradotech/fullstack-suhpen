import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { NotificationTemplateIndexApp } from '../../infrastructure/notification-template-index.app'
import { NotificationTemplateIndexRequest } from '../../infrastructure/notification-template-index.request'
import { NotificationTemplateResponse } from '../../infrastructure/notification-template.response'

const THIS_MODULE = Modules.NotificationTemplateSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationTemplateSheetController {
  constructor(
    private readonly notificationTemplateIndexApp: NotificationTemplateIndexApp,
  ) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: NotificationTemplateIndexRequest,
  ): Promise<IApiExportRes<NotificationTemplateResponse[]>> {
    req.isExport = true
    const response = await this.notificationTemplateIndexApp.fetch(req)

    const data = NotificationTemplateResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.NotificationTemplate
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
