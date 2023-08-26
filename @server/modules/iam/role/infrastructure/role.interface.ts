import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { IIamPermission } from '../../permission/infrastructure/permission.interface'

export interface IIamRole extends IBaseMasterData {
  permissions: IIamPermission[] | undefined
}
