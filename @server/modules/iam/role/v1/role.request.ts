import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { IsArray, IsOptional, IsUUID } from 'class-validator'
import { EntPermission } from '../../permission/infrastructure/permission.entity'
import { EntRole } from '../infrastructure/role.entity'
import { IRole } from '../infrastructure/role.interface'

export class RoleRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  permissionIds?: string[]
}

export class RoleCreateRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest): IRole {
    return Object.assign(new EntRole(), data)
  }
}

export class RoleUpdateRequest extends OmitType(RoleRequest, ['id']) {
  static dto(res: IRole, data: RoleUpdateRequest): IRole {
    return Object.assign(res, data)
  }
}

export class RoleSyncRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest, permissions: EntPermission[]): IRole {
    const res = RoleCreateRequest.dto(data)
    res.permissions = permissions
    return res
  }
}
