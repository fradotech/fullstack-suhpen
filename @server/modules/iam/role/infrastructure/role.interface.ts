import { ERole } from 'client/Modules/Iam/Role/Role.enum'
import { IBaseEntity } from '../../../../infrastructure/base/base-entity.interface'

export interface IRole extends IBaseEntity {
  name: ERole
}
