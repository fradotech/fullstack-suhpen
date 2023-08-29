import { RegionDistrict } from './district.entity'
import { IDistrict } from './district.interface'

export class DistrictResponse extends RegionDistrict {
  static dto(data: IDistrict): DistrictResponse {
    const res = new DistrictResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: IDistrict[]): DistrictResponse[] {
    return data.map((data) => this.dto(data))
  }
}
