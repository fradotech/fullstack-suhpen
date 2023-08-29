import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Entity, JoinTable, ManyToMany } from 'typeorm'
import { IamPermission } from '../../permission/infrastructure/permission.entity'
import { IRole } from './role.interface'

@Entity()
export class IamRole extends EntBaseMasterData implements IRole {
  @ManyToMany(() => IamPermission)
  @JoinTable({ name: 'iam_role_permissions' })
  permissions: IamPermission[] | undefined
}
