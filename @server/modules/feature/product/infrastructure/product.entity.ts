import { EntBaseProduct } from '@server/infrastructure/base/product/base-product.entity'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { EntCategory } from '../../category/infrastructure/category.entity'
import { ICategory } from '../../category/infrastructure/category.interface'
import { IProduct } from './product.interface'

@Entity()
export class EntProduct extends EntBaseProduct implements IProduct {
  @Column({ default: null })
  sku?: string

  @Column()
  stock: number

  @Column({ default: 0 })
  buyPrice: number

  @Column({ default: 0 })
  sellPrice: number

  @Column({ default: 0 })
  marginPrice: number

  @ManyToMany(() => EntCategory)
  @JoinTable({ name: 'ent_product_categories' })
  categories?: ICategory[]

  @Column({ default: 0 })
  discountPercentage?: number

  @Column({ default: null })
  brand?: string

  @Column({ default: null })
  rating?: string

  @Column({ default: null })
  expiredDate?: Date

  @ManyToOne(() => EntProduct, (product) => product.childs)
  parent?: IProduct

  @OneToMany(() => EntProduct, (product) => product.parent)
  childs?: IProduct[]

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertAndUpdate(): void {
    this.marginPrice = this.sellPrice - this.buyPrice
  }
}
