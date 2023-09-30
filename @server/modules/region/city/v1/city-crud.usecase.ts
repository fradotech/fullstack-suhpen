import { Injectable } from '@nestjs/common'
import { IBaseCrudUsecase } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { ICity } from '../infrastructure/city.interface'
import { CityService } from '../infrastructure/city.service'
import { CityCreateRequest, CityUpdateRequest } from './city.request'

@Injectable()
export class CityCrudUsecase
  implements Exactly<IBaseCrudUsecase, CityCrudUsecase>
{
  constructor(private readonly cityService: CityService) {}

  async find(): Promise<ICity[]> {
    return await this.cityService.find()
  }

  async create(req: CityCreateRequest): Promise<ICity> {
    const data = CityCreateRequest.dto(req)

    return await this.cityService.save(data)
  }

  async findOneOrFail(id: string): Promise<ICity> {
    return await this.cityService.findByIdRelationProvince(id)
  }

  async update(id: string, req: CityUpdateRequest): Promise<ICity> {
    const data = await this.cityService.findOneByOrFail({ id })
    const dataUpdate = CityUpdateRequest.dto(data, req)

    return await this.cityService.save(dataUpdate)
  }

  async delete(id: string): Promise<ICity> {
    const data = await this.cityService.findOneByOrFail({ id })
    await this.cityService.delete(id)
    return data
  }
}
