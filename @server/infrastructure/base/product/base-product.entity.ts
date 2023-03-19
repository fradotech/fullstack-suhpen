import { Utils } from '@server/common/utils/utils'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { BeforeInsert, Column, ManyToOne, OneToMany } from 'typeorm'
import { IBaseProduct } from './base-product.interface'

export class EntBaseProduct extends BaseEntity implements IBaseProduct {
  @Column()
  name: string

  @Column()
  key: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: null, type: 'text' })
  description?: string

  @Column({ default: null })
  thumbnail?: string

  @ManyToOne(() => EntBaseProduct, (baseProduct) => baseProduct.childs)
  parent?: IBaseProduct

  @OneToMany(() => EntBaseProduct, (baseProduct) => baseProduct.parent)
  childs?: IBaseProduct[]

  @BeforeInsert()
  beforeInsert(): void {
    this.key = this.key || Utils.camelToSnake(this.name)
  }
}
