import { RoleEnum } from '@server/modules/iam/role/common/role.enum'
import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'

export interface IRole extends IBaseEntity {
  name: RoleEnum
}
