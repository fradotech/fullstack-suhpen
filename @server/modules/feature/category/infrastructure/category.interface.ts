import { IBaseProduct } from '@server/infrastructure/base/product/base-product.interface'

export interface ICategory extends IBaseProduct {
  labelColor: string
  parent?: ICategory
  childs?: ICategory[]
}
