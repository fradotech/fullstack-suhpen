import { RegionProvince } from './province.entity'
import { IProvince } from './province.interface'

export class ProvinceResponse extends RegionProvince {
  static dto(data: IProvince): ProvinceResponse {
    const res = new ProvinceResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: IProvince[]): ProvinceResponse[] {
    return data.map((data) => this.dto(data))
  }
}
