import { OmitType, PartialType } from '@nestjs/swagger'
import { RegionCity } from '../infrastructure/city.entity'
import { ICity } from '../infrastructure/city.interface'

export class CityRequest extends RegionCity implements ICity {}

export class CityCreateRequest extends PartialType(CityRequest) {
  static dto(data: CityCreateRequest): ICity {
    return Object.assign(new RegionCity(), data)
  }
}

export class CityUpdateRequest extends OmitType(CityRequest, ['id']) {
  static dto(res: ICity, data: CityUpdateRequest): ICity {
    return Object.assign(res, data)
  }
}
