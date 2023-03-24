import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { IProduct } from '../../product/infrastructure/product.interface'

export interface IInventory extends IBaseEntity {
  sku?: string
  product: IProduct
  productVariantName?: string
  buyPrice: number
  sellPrice: number
  marginPrice: number
  stock: number
  stockMinimum: number
  expiredDate?: Date
  discount?: number
  isActive: boolean
  // store: IStore
  // supplier?: ISupplier
}
