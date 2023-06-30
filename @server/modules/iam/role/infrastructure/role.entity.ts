import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { EntPermission } from '../../permission/infrastructure/permission.entity'
import { IPermission } from '../../permission/infrastructure/permission.interface'
import { IRole } from './role.interface'

@Entity()
export class EntRole extends EntBaseMasterData implements IRole {
  @Column({ default: '#ffffff' })
  labelColor: string

  @ManyToMany(() => EntPermission)
  @JoinTable({ name: 'ent_role_permissions' })
  permissions: IPermission[]
}
