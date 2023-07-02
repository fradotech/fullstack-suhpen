import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { EntRole } from '../../role/infrastructure/role.entity'

export interface IPermission extends IBaseMasterData {
  roles: EntRole[]
  module: string
  path: string
  method: string
}
