import { IBaseEntity } from '../base-entity.interface'

export interface IBaseProduct extends IBaseEntity {
  id: string
  name: string
  key: string
  isActive: boolean
  description?: string
  thumbnail?: string
  parent?: IBaseProduct
  childs?: IBaseProduct[]
}
