import { OmitType, PartialType } from '@nestjs/swagger'
import { RegionDistrict } from '../infrastructure/district.entity'
import { IDistrict } from '../infrastructure/district.interface'

export class DistrictRequest extends RegionDistrict implements IDistrict {}

export class DistrictCreateRequest extends PartialType(DistrictRequest) {
  static dto(data: DistrictCreateRequest): IDistrict {
    return Object.assign(new RegionDistrict(), data)
  }
}

export class DistrictUpdateRequest extends OmitType(DistrictRequest, ['id']) {
  static dto(res: IDistrict, data: DistrictUpdateRequest): IDistrict {
    return Object.assign(res, data)
  }
}
