import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { SuperAdminGuard } from '@server/modules/iam/auth/common/super-admin.guard'
import { Modules } from '@server/modules/modules'
import { LoggerIndexRequest } from '../infrastructure/logger-index.request'
import { LoggerResponse } from '../infrastructure/logger.response'
import { LoggerIndexApp } from './logger-index.app'

const THIS_MODULE = Modules.Log

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(SuperAdminGuard)
export class LoggerController {
  constructor(private readonly loggerIndexApp: LoggerIndexApp) {}

  @Get()
  async fetch(
    @Query() req: LoggerIndexRequest,
  ): Promise<IApiRes<LoggerResponse[]>> {
    const res = await this.loggerIndexApp.fetch(req)
    return ApiRes.dto(res.data)
  }
}
