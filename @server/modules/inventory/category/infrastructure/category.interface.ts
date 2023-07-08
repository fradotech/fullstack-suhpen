import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'

export interface ICategory extends IBaseMasterData {
  parent?: ICategory
  childs?: ICategory[]
}
