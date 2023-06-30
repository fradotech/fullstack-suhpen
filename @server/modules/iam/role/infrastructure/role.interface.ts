import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { IPermission } from '../../permission/infrastructure/permission.interface'

export interface IRole extends IBaseMasterData {
  labelColor: string
  permissions: IPermission[]
}
