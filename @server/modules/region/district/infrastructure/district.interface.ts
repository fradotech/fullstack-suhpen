import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { ICity } from '../../city/infrastructure/city.interface'

export interface IDistrict extends IBaseEntity {
  name: string
  oid: number
  city: ICity
}
