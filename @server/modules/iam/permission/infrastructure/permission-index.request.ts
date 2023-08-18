import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { IamPermission } from './permission.entity'

class PermissionIndexFilterRequest extends IamPermission {}

export class PermissionIndexRequest extends IndexRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  roleId?: string

  @ValidateNested({ each: true })
  @Type(() => PermissionIndexFilterRequest)
  filters?: PermissionIndexFilterRequest
}
