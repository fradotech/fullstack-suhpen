import { IBaseMasterData } from '@server/infrastructure/base/product/base-master-data.interface'

export interface ICategory extends IBaseMasterData {
  labelColor: string
  parent?: ICategory
  childs?: ICategory[]
}
