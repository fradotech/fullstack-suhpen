import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { LogActivityIndexRequest } from '../infrastructure/log-activity-index.request'
import { LogActivityResponse } from '../infrastructure/log-activity.response'
import { LogActivityIndexApp } from './log-activity-index.app'

const THIS_MODULE = Modules.Log

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class LogActivityController {
  constructor(private readonly logActivityIndexApp: LogActivityIndexApp) {}

  @Get()
  async fetch(
    @Query() req: LogActivityIndexRequest,
  ): Promise<IApiRes<LogActivityResponse[]>> {
    const res = await this.logActivityIndexApp.fetch(req)
    return ApiRes.dto(res.data)
  }
}
