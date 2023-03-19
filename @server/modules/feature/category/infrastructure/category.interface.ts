import { IBaseProduct } from '@server/infrastructure/base/product/base-product.interface'

export interface ICategory extends IBaseProduct {
  parent?: ICategory
  childs?: ICategory[]
}
