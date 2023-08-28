import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { LogActivityIndexApp } from '../infrastructure/log-activity-index.app'
import { LogActivityResponse } from '../infrastructure/log-activity.response'
import { LogActivityCrudApp } from '../infrastructure/permission-crud.app'
import { LogActivityIndexRequest } from './log-activity-index.request'

const THIS_MODULE = Modules.Log

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class LogActivityController {
  constructor(
    private readonly logActivityIndexApp: LogActivityIndexApp,
    private readonly logActivityCrudApp: LogActivityCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: LogActivityIndexRequest,
  ): Promise<IApiRes<LogActivityResponse[]>> {
    const res = await this.logActivityIndexApp.fetch(req)
    return ApiRes.dto(LogActivityResponse.dtos(res.data), res.meta)
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<LogActivityResponse>> {
    const data = await this.logActivityCrudApp.findOneOrFail(id)
    return ApiRes.dto(LogActivityResponse.dto(data))
  }
}
