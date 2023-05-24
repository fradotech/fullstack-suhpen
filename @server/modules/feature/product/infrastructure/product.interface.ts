import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { ICategory } from '../../category/infrastructure/category.interface'

export interface IProduct extends IBaseMasterData {
  upc?: string
  categories?: ICategory[]
  brand?: string
  rating?: string
  parent?: IProduct
  childs?: IProduct[]
}
