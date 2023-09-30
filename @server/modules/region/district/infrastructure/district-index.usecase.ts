import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { DistrictIndexRequest } from './district-index.request'
import { IDistrict } from './district.interface'
import { DistrictService } from './district.service'

@Injectable()
export class DistrictIndexUsecase extends BaseIndexUsecase {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly districtService: DistrictService,
  ) {
    super()
  }

  async fetch(
    req: DistrictIndexRequest,
  ): Promise<IPaginateResponse<IDistrict>> {
    const name = 'district'
    const columns = ['name', 'oid', 'updatedAt', 'createdAt']
    const relations: IIndexUsecaseRelation[] = [{ name: 'city' }]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.districtService,
      this.request,
    )

    if (req.cityId) {
      query.andWhere(`city.id = :cityId`, {
        cityId: req.cityId,
      })
    }
    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
