import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntProduct } from './product.entity'

class ProductIndexFilterRequest extends EntProduct {}

export class ProductIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => ProductIndexFilterRequest)
  filters?: ProductIndexFilterRequest
}
