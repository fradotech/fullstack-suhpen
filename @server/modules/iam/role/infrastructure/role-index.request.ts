import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntRole } from './role.entity'

class RoleIndexFilterRequest extends EntRole {}

export class RoleIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => RoleIndexFilterRequest)
  filters?: RoleIndexFilterRequest
}
