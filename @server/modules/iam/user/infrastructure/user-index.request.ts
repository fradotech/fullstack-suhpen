import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { ERole } from '@server/modules/iam/role/infrastructure/role.enum'
import { Type } from 'class-transformer'
import { IsEnum, IsOptional, ValidateNested } from 'class-validator'

class UserIndexFilterRequest {
  @IsOptional()
  @IsEnum(ERole, { each: true })
  @ApiProperty({ example: ERole.User })
  role?: ERole
}

export class UserIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => UserIndexFilterRequest)
  filters?: UserIndexFilterRequest
}
