import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { ECategoryName } from './category.enum'

export interface ICategory extends IBaseEntity {
  id: string
  name: ECategoryName
  key?: string
  description?: string
  thumbnail?: string
  parent?: ICategory
  childs?: ICategory[]
}
