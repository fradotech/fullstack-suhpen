import { BaseEntity } from '@server/infrastructure/base/base.entity'
import dayjs from 'dayjs'
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm'
import { EntProduct } from '../../product/infrastructure/product.entity'
import { IProduct } from '../../product/infrastructure/product.interface'
import { VariantSupplyTypeEnum } from '../common/variant.enum'
import { IVariant } from './variant.interface'

@Entity()
export class EntVariant extends BaseEntity implements IVariant {
  @Column({ default: null, unique: true })
  sku?: string

  @ManyToOne(() => EntProduct, (product) => product.variant)
  product: IProduct

  @Column({ default: null })
  name: string

  @Column({ default: VariantSupplyTypeEnum.SelfStock })
  supplyType: VariantSupplyTypeEnum

  @Column({ default: 0 })
  buyPrice: number

  @Column({ default: 0 })
  sellPrice: number

  @Column({ default: 0 })
  marginPrice: number

  @Column({ default: 0 })
  stock: number

  @Column({ default: null })
  stockMinimum: number

  @Column({ default: 0 })
  discountPercentage?: number

  @Column({ default: null, type: 'timestamp' })
  expiredDate?: Date | dayjs.Dayjs

  @Column({ default: true })
  isActive: boolean

  @Column({ default: null })
  thumbnail?: string

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertAndUpdate(): void {
    this.marginPrice = this.sellPrice || 0 - this.buyPrice || 0
  }
}
