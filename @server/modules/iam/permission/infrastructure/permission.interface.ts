import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'

export interface IPermission extends IBaseMasterData {
  module: string
  path: string
  method: string
}
