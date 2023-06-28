import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

export class PermissionRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
  @ApiProperty({ example: '#007fd0' })
  labelColor: string
}

export class PermissionCreateRequest extends PartialType(PermissionRequest) {
  static dto(data: PermissionCreateRequest): IPermission {
    return Object.assign(new EntPermission(), data)
  }
}

export class PermissionUpdateRequest extends PartialType(PermissionRequest) {
  static dto(data: IPermission, req: PermissionUpdateRequest): IPermission {
    return Object.assign(data, req)
  }
}
