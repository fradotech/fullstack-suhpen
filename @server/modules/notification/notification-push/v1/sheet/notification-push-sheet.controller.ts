import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { NotificationPushIndexRequest } from '../../infrastructure/notification-push-index.request'
import { NotificationPushIndexUsecase } from '../../infrastructure/notification-push-index.usecase'
import { NotificationPushResponse } from '../../infrastructure/notification-push.response'

const THIS_MODULE = Modules.NotificationPushSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationPushSheetController {
  constructor(
    private readonly notificationPushIndexUsecase: NotificationPushIndexUsecase,
  ) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: NotificationPushIndexRequest,
  ): Promise<IApiExportRes<NotificationPushResponse[]>> {
    req.isExport = true
    const response = await this.notificationPushIndexUsecase.fetch(req)

    const data = NotificationPushResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.NotificationPush
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
