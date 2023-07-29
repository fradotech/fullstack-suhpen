import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { EntRole } from '../../role/infrastructure/role.entity'
import { PermissionMethodEnum } from '../common/permission.enum'

export interface IPermission extends IBaseMasterData {
  roles: EntRole[]
  module: string
  path: string
  method: PermissionMethodEnum
}
