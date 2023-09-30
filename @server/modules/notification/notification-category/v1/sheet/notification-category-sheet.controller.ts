import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { NotificationCategoryIndexRequest } from '../../infrastructure/notification-category-index.request'
import { NotificationCategoryIndexUsecase } from '../../infrastructure/notification-category-index.usecase'
import { NotificationCategoryResponse } from '../../infrastructure/notification-category.response'

const THIS_MODULE = Modules.NotificationCategorySheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationCategorySheetController {
  constructor(
    private readonly notificationCategoryIndexUsecase: NotificationCategoryIndexUsecase,
  ) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: NotificationCategoryIndexRequest,
  ): Promise<IApiExportRes<NotificationCategoryResponse[]>> {
    req.isExport = true
    const response = await this.notificationCategoryIndexUsecase.fetch(req)

    const data = NotificationCategoryResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.NotificationCategory
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
