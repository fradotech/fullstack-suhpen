import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { LogActivityIndexRequest } from '../infrastructure/log-activity-index.request'
import { ILogActivity } from '../infrastructure/log-activity.interface'
import { LogActivityService } from '../infrastructure/log-activity.service'

@Injectable()
export class LogActivityIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly logActivityService: LogActivityService,
  ) {
    super()
  }

  async fetch(
    req: LogActivityIndexRequest,
  ): Promise<IPaginateResponse<ILogActivity>> {
    const name = 'logActivity'
    const columns = [
      'executeTime',
      'method',
      'url',
      'remoteAddress',
      'createdAt',
    ]
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.logActivityService,
      this.request,
      true,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
