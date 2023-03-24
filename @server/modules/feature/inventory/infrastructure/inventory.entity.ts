import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { EntProduct } from '../../product/infrastructure/product.entity'
import { IInventory } from './inventory.interface'

@Entity()
export class EntInventory extends BaseEntity implements IInventory {
  @ManyToOne(() => EntProduct, (product) => product.id)
  product: EntProduct

  @Column({ default: 0 })
  stock: number

  @Column({ default: null })
  stockMinimum: number

  @Column({ default: 0 })
  discount?: number

  @Column({ default: true })
  isActive: boolean
}
