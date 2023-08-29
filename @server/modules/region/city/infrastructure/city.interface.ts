import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { IProvince } from '../../province/infrastructure/province.interface'

export interface ICity extends IBaseEntity {
  name: string
  oid: number
  province: IProvince
}
