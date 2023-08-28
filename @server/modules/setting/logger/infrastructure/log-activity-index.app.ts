import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { LogActivityIndexRequest } from '../v1/log-activity-index.request'
import { ILogActivity } from './log-activity.interface'
import { LogActivityService } from './log-activity.service'

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
    if (!req.sortField || req.sortField === 'undefined') {
      req.sortField = 'createdAt'
    }

    const name = 'logActivity'
    const columns = ['method', 'remoteAddress', 'createdAt']
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
