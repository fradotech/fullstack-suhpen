import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { LoggerIndexRequest } from '../infrastructure/logger-index.request'
import { LoggerResponse } from '../infrastructure/logger.response'
import { LoggerService } from '../infrastructure/logger.service'

@Injectable()
export class LoggerIndexApp {
  constructor(private readonly loggerService: LoggerService) {}

  async fetch(
    req: LoggerIndexRequest,
  ): Promise<IPaginateResponse<LoggerResponse>> {
    req
    const res = await this.loggerService.fetch()
    return {
      data: res,
      meta: undefined,
    }
  }
}
