import { OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntUser } from './user.entity'

export class UserIndexFilterRequest extends OmitType(EntUser, ['roles']) {
  roles?: string[]
}

export class UserIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => UserIndexFilterRequest)
  filters?: UserIndexFilterRequest
}
