import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm'
import { EntProduct } from '../../product/infrastructure/product.entity'
import { IProduct } from '../../product/infrastructure/product.interface'
import { IInventory } from './inventory.interface'

@Entity()
export class EntInventory extends BaseEntity implements IInventory {
  @Column({ default: null })
  sku?: string

  @ManyToOne(() => EntProduct, (product) => product.inventories)
  product: IProduct

  @Column({ default: null })
  productVariantName?: string

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
  discount?: number

  @Column({ default: null })
  expiredDate?: Date

  @Column({ default: true })
  isActive: boolean

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertAndUpdate(): void {
    this.marginPrice = this.sellPrice - this.buyPrice
  }
}
