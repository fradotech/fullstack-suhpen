import { Injectable } from '@nestjs/common'
import { IBaseCrudUsecase } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { IProvince } from '../infrastructure/province.interface'
import { ProvinceService } from '../infrastructure/province.service'
import {
  ProvinceCreateRequest,
  ProvinceUpdateRequest,
} from './province.request'

@Injectable()
export class ProvinceCrudUsecase
  implements Exactly<IBaseCrudUsecase, ProvinceCrudUsecase>
{
  constructor(private readonly provinceService: ProvinceService) {}

  async find(): Promise<IProvince[]> {
    return await this.provinceService.find()
  }

  async create(req: ProvinceCreateRequest): Promise<IProvince> {
    const data = ProvinceCreateRequest.dto(req)

    return await this.provinceService.save(data)
  }

  async findOneOrFail(id: string): Promise<IProvince> {
    return await this.provinceService.findOneByOrFail({ id })
  }

  async update(id: string, req: ProvinceUpdateRequest): Promise<IProvince> {
    const data = await this.provinceService.findOneByOrFail({ id })
    const dataUpdate = ProvinceUpdateRequest.dto(data, req)

    return await this.provinceService.save(dataUpdate)
  }

  async delete(id: string): Promise<IProvince> {
    const data = await this.provinceService.findOneByOrFail({ id })
    await this.provinceService.delete(id)
    return data
  }
}
