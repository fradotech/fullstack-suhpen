import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntPermission } from './permission.entity'

class PermissionIndexFilterRequest extends EntPermission {}

export class PermissionIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => PermissionIndexFilterRequest)
  filters?: PermissionIndexFilterRequest
}
