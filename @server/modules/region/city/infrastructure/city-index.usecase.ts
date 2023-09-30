import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { CityIndexRequest } from './city-index.request'
import { ICity } from './city.interface'
import { CityService } from './city.service'

@Injectable()
export class CityIndexUsecase extends BaseIndexUsecase {
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
    const relations: IIndexUsecaseRelation[] = [{ name: 'province' }]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.cityService,
      this.request,
    )

    if (req.provinceId) {
      query.andWhere(`province.id = :provinceId`, {
        provinceId: req.provinceId,
      })
    }

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
