import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { PushNotificationIndexApp } from '../../infrastructure/push-notification-index.app'
import { PushNotificationIndexRequest } from '../../infrastructure/push-notification-index.request'
import { PushNotificationResponse } from '../../infrastructure/push-notification.response'

const THIS_MODULE = Modules.PushNotificationSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class PushNotificationSheetController {
  constructor(
    private readonly pushNotificationIndexApp: PushNotificationIndexApp,
  ) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: PushNotificationIndexRequest,
  ): Promise<IApiExportRes<PushNotificationResponse[]>> {
    req.isExport = true
    const response = await this.pushNotificationIndexApp.fetch(req)

    const data = PushNotificationResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.PushNotification
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
