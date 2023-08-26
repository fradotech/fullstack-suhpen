import { ApiProperty } from '@nestjs/swagger'
import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { IamRole } from '../../role/infrastructure/role.entity'
import { PermissionMethodEnum } from '../common/permission.enum'
import { IIamPermission } from './permission.interface'

@Entity()
export class IamPermission extends EntBaseMasterData implements IIamPermission {
  @ManyToMany(() => IamRole)
  @JoinTable({ name: 'iam_role_permissions' })
  roles: IamRole[]

  @ApiProperty()
  @Column({ default: null })
  module: string

  @ApiProperty()
  @Column()
  path: string

  @ApiProperty()
  @Column()
  method: PermissionMethodEnum
}
