import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsArray, IsOptional, IsUUID } from 'class-validator'
import { IamPermission } from '../../permission/infrastructure/permission.entity'
import { IamRole } from '../infrastructure/role.entity'
import { IRole } from '../infrastructure/role.interface'

export class RoleRequest extends IamRole implements IRole {
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  permissionIds?: string[]
}

export class RoleCreateRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest): IRole {
    return Object.assign(new IamRole(), data)
  }
}

export class RoleUpdateRequest extends OmitType(RoleRequest, ['id']) {
  static dto(res: IRole, data: RoleUpdateRequest): IRole {
    return Object.assign(res, data)
  }
}

export class RoleSyncRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest, permissions: IamPermission[]): IRole {
    const res = RoleCreateRequest.dto(data)
    res.permissions = permissions
    return res
  }
}
