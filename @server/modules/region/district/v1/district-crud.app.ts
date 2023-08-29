import { Injectable } from '@nestjs/common'
import { IBaseCrudApp } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { IDistrict } from '../infrastructure/district.interface'
import { DistrictService } from '../infrastructure/district.service'
import {
  DistrictCreateRequest,
  DistrictUpdateRequest,
} from './district.request'

@Injectable()
export class DistrictCrudApp implements Exactly<IBaseCrudApp, DistrictCrudApp> {
  constructor(private readonly districtService: DistrictService) {}

  async find(): Promise<IDistrict[]> {
    return await this.districtService.find()
  }

  async create(req: DistrictCreateRequest): Promise<IDistrict> {
    const data = DistrictCreateRequest.dto(req)

    return await this.districtService.save(data)
  }

  async findOneOrFail(id: string): Promise<IDistrict> {
    return await this.districtService.findByIdRelationProvince(id)
  }

  async update(id: string, req: DistrictUpdateRequest): Promise<IDistrict> {
    const data = await this.districtService.findOneByOrFail({ id })
    const dataUpdate = DistrictUpdateRequest.dto(data, req)

    return await this.districtService.save(dataUpdate)
  }

  async delete(id: string): Promise<IDistrict> {
    const data = await this.districtService.findOneByOrFail({ id })
    await this.districtService.delete(id)
    return data
  }
}
