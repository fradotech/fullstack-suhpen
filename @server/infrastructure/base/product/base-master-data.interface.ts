import { IBaseEntity } from '../base-entity.interface'

export interface IBaseMasterData extends IBaseEntity {
  id: string
  name: string
  key: string
  isActive: boolean
  description?: string
  thumbnail?: string
  parent?: IBaseMasterData
  childs?: IBaseMasterData[]
}
