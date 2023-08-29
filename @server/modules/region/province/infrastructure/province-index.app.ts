import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { ProvinceIndexRequest } from './province-index.request'
import { IProvince } from './province.interface'
import { ProvinceService } from './province.service'

@Injectable()
export class ProvinceIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly provinceService: ProvinceService,
  ) {
    super()
  }

  async fetch(
    req: ProvinceIndexRequest,
  ): Promise<IPaginateResponse<IProvince>> {
    const name = 'province'
    const columns = ['name', 'oid', 'updatedAt', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.provinceService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
