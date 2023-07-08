import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { EntCategory } from '../../category/infrastructure/category.entity'
import { ICategory } from '../../category/infrastructure/category.interface'
import { EntVariant } from '../../variant/infrastructure/variant.entity'
import { IVariant } from '../../variant/infrastructure/variant.interface'
import { IProduct } from './product.interface'

@Entity()
export class EntProduct extends EntBaseMasterData implements IProduct {
  @Column({ default: null, unique: true })
  upc?: string

  @ManyToMany(() => EntCategory)
  @JoinTable({ name: 'ent_product_categories' })
  categories?: ICategory[]

  @Column({ default: null })
  brand?: string

  @Column({ default: null })
  rating?: string

  @ManyToOne(() => EntProduct, (product) => product.childs)
  parent?: IProduct

  @OneToMany(() => EntProduct, (product) => product.parent)
  childs?: IProduct[]

  @OneToMany(() => EntVariant, (variant) => variant.product)
  variant: IVariant[]
}
