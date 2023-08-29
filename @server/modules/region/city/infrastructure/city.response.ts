import { RegionCity } from './city.entity'
import { ICity } from './city.interface'

export class CityResponse extends RegionCity {
  static dto(data: ICity): CityResponse {
    const res = new CityResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: ICity[]): CityResponse[] {
    return data.map((data) => this.dto(data))
  }
}
