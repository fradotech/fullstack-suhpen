import { OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { IamUser } from './user.entity'

export class UserIndexFilterRequest extends OmitType(IamUser, ['roles']) {
  roles?: string[]
}

export class UserIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => UserIndexFilterRequest)
  filters?: UserIndexFilterRequest
}
