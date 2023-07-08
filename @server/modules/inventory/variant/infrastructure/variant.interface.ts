import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import dayjs from 'dayjs'
import { IProduct } from '../../product/infrastructure/product.interface'
import { VariantSupplyTypeEnum } from '../common/variant.enum'

export interface IVariant extends IBaseEntity {
  sku?: string
  product: IProduct
  name: string
  supplyType: VariantSupplyTypeEnum
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
