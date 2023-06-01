import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import dayjs from 'dayjs'
import { IProduct } from '../../product/infrastructure/product.interface'
import { EInventorySupplyType } from './inventory.enum'

export interface IInventory extends IBaseEntity {
  sku?: string
  product: IProduct
  variant?: string
  supplyType: EInventorySupplyType
  buyPrice: number
  sellPrice: number
  marginPrice: number
  stock: number
  stockMinimum: number
  expiredDate?: Date | dayjs.Dayjs
  discountPercentage?: number
  isActive: boolean
  thumbnail?: string
}
