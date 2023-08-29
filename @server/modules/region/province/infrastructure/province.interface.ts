import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'

export interface IProvince extends IBaseEntity {
  name: string
  oid: number
}
