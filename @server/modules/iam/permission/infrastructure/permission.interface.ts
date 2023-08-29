import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { IamRole } from '../../role/infrastructure/role.entity'
import { PermissionMethodEnum } from '../common/permission.enum'

export interface IPermission extends IBaseMasterData {
  roles: IamRole[]
  module: string
  path: string
  method: PermissionMethodEnum
}
