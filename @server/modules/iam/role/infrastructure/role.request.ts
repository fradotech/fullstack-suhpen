import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator'
import { EntPermission } from '../../permission/infrastructure/permission.entity'
import { EntRole } from './role.entity'
import { IRole } from './role.interface'

export class RoleRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
  @ApiProperty({ example: '#007fd0' })
  labelColor: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  permissionIds?: string[]
}

export class RoleCreateRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest): IRole {
    return Object.assign(new EntRole(), data)
  }
}

export class RoleUpdateRequest extends PartialType(RoleRequest) {
  static dto(data: IRole, req: RoleUpdateRequest): IRole {
    return Object.assign(data, req)
  }
}

export class RoleSyncRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest, permissions: EntPermission[]): IRole {
    const res = RoleCreateRequest.dto(data)
    res.permissions = permissions
    return res
  }
}
