import { OmitType, PartialType } from '@nestjs/swagger'
import { RegionProvince } from '../infrastructure/province.entity'
import { IProvince } from '../infrastructure/province.interface'

export class ProvinceRequest extends RegionProvince implements IProvince {}

export class ProvinceCreateRequest extends PartialType(ProvinceRequest) {
  static dto(data: ProvinceCreateRequest): IProvince {
    return Object.assign(new RegionProvince(), data)
  }
}

export class ProvinceUpdateRequest extends OmitType(ProvinceRequest, ['id']) {
  static dto(res: IProvince, data: ProvinceUpdateRequest): IProvince {
    return Object.assign(res, data)
  }
}
