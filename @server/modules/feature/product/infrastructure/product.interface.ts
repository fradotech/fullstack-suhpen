import { IBaseProduct } from '@server/infrastructure/base/product/base-product.interface'
import { ICategory } from '../../category/infrastructure/category.interface'

export interface IProduct extends IBaseProduct {
  sku?: string
  stock: number
  price: number
  categories?: ICategory[]
  discountPercentage?: number
  brand?: string
  rating?: string
  expiredDate?: Date
  parent?: IProduct
  childs?: IProduct[]
}
