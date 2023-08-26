import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IsArray, IsOptional, IsUUID } from 'class-validator'
import { IamPermission } from '../../permission/infrastructure/permission.entity'
import { IamRole } from '../infrastructure/role.entity'
import { IIamRole } from '../infrastructure/role.interface'

export class RoleRequest extends IamRole implements IIamRole {
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  permissionIds?: string[]
}

export class RoleCreateRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest): IIamRole {
    return Object.assign(new IamRole(), data)
  }
}

export class RoleUpdateRequest extends OmitType(RoleRequest, ['id']) {
  static dto(res: IIamRole, data: RoleUpdateRequest): IIamRole {
    return Object.assign(res, data)
  }
}

export class RoleSyncRequest extends PartialType(RoleRequest) {
  static dto(data: RoleCreateRequest, permissions: IamPermission[]): IIamRole {
    const res = RoleCreateRequest.dto(data)
    res.permissions = permissions
    return res
  }
}
