import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntUser } from './user.entity'

class UserIndexFilterRequest extends EntUser {}

export class UserIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => UserIndexFilterRequest)
  filters?: UserIndexFilterRequest
}
