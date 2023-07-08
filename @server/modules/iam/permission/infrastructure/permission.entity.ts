import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { EntRole } from '../../role/infrastructure/role.entity'
import { IPermission } from './permission.interface'

@Entity()
export class EntPermission extends EntBaseMasterData implements IPermission {
  @ManyToMany(() => EntRole)
  @JoinTable({ name: 'ent_role_permissions' })
  roles: EntRole[]

  @Column({ default: null })
  module: string

  @Column()
  path: string

  @Column()
  method: string
}
