import { BaseEntity } from '@server/infrastructure/base/base.entity'
import dayjs from 'dayjs'
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm'
import { EntProduct } from '../../product/infrastructure/product.entity'
import { IProduct } from '../../product/infrastructure/product.interface'
import { EInventorySupplyType } from './inventory.enum'
import { IInventory } from './inventory.interface'

@Entity()
export class EntInventory extends BaseEntity implements IInventory {
  @Column({ default: null, unique: true })
  sku?: string

  @ManyToOne(() => EntProduct, (product) => product.inventories)
  product: IProduct

  @Column({ default: null })
  variant?: string

  @Column({ default: EInventorySupplyType.SelfStock })
  supplyType: EInventorySupplyType

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

  @Column({ default: null, type: 'datetime' })
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
