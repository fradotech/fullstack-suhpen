import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ECategoryName } from './category.enum'
import { ICategory } from './category.interface'

@Entity()
export class EntCategory extends BaseEntity implements ICategory {
  @Column()
  id: string

  @Column({ default: null, type: 'enum', enum: ECategoryName })
  name: ECategoryName

  @Column()
  key: string

  @Column({ default: null })
  description?: string

  @Column({ default: null })
  thumbnail?: string

  @ManyToOne(() => EntCategory, (category) => category.childs)
  parent?: ICategory

  @OneToMany(() => EntCategory, (category) => category.parent)
  childs?: ICategory[]
}
