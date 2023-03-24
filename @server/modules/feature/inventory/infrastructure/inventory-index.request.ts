import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { EntInventory } from './inventory.entity'

class InventoryIndexFilterRequest extends EntInventory {}

export class InventoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => InventoryIndexFilterRequest)
  filters?: InventoryIndexFilterRequest
}
