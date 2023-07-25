import { OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntRole } from './role.entity'

export class RoleIndexFilterRequest extends OmitType(EntRole, ['permissions']) {
  permissions?: string[]
}

export class RoleIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => RoleIndexFilterRequest)
  filters?: RoleIndexFilterRequest
}
