import { IBaseEntity } from '../base-entity.interface'

export interface IBaseMasterData extends IBaseEntity {
  name: string
  key: string
  isActive: boolean
  description?: string
  thumbnail?: string
  labelColor?: string
  parent?: IBaseMasterData
  childs?: IBaseMasterData[]
}
