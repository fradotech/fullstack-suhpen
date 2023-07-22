import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntMessageCategory } from './message-category.entity'

class MessageCategoryIndexFilterRequest extends EntMessageCategory {}

export class MessageCategoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => MessageCategoryIndexFilterRequest)
  filters?: MessageCategoryIndexFilterRequest
}
