import { EntBaseMasterData } from './base-master-data.entity'
import { IBaseMasterData } from './base-master-data.interface'

export abstract class BaseMasterDataRequest
  extends EntBaseMasterData
  implements IBaseMasterData
{
  parent?: IBaseMasterData
  childs?: IBaseMasterData[]
}
