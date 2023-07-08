import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { EntPermission } from './permission.entity'

class PermissionIndexFilterRequest extends EntPermission {}

export class PermissionIndexRequest extends IndexRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  roleId?: string

  @ValidateNested({ each: true })
  @Type(() => PermissionIndexFilterRequest)
  filters?: PermissionIndexFilterRequest
}
