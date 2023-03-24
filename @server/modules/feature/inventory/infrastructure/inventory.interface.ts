import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { IProduct } from '../../product/infrastructure/product.interface'

export interface IInventory extends IBaseEntity {
  product: IProduct
  stock: number
  stockMinimum: number
  discount?: number
  isActive: boolean
  // store: IStore
  // supplier?: ISupplier
}
