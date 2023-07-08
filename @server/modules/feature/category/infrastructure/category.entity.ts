import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { ICategory } from './category.interface'

@Entity()
export class EntCategory extends EntBaseMasterData implements ICategory {
  @ManyToOne(() => EntCategory, (category) => category.childs)
  parent?: ICategory

  @OneToMany(() => EntCategory, (category) => category.parent)
  childs?: ICategory[]
}
