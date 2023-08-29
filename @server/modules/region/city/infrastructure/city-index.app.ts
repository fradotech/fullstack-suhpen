import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { CityIndexRequest } from './city-index.request'
import { ICity } from './city.interface'
import { CityService } from './city.service'

@Injectable()
export class CityIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly cityService: CityService,
  ) {
    super()
  }

  async fetch(req: CityIndexRequest): Promise<IPaginateResponse<ICity>> {
    const name = 'city'
    const columns = ['name', 'oid', 'updatedAt', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.cityService,
      this.request,
    )

    // CONTINUE: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
