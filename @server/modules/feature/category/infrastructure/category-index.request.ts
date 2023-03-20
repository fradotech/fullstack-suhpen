import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntCategory } from './category.entity'

class CategoryIndexFilterRequest extends EntCategory {}

export class CategoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => CategoryIndexFilterRequest)
  filters?: CategoryIndexFilterRequest
}
