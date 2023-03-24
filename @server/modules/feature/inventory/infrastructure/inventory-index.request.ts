import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { EntInventory } from './inventory.entity'

class InventoryIndexFilterRequest extends EntInventory {}

export class InventoryIndexRequest extends IndexRequest {
  @IsOptional()
  @IsString()
  @ApiProperty()
  productId?: string

  @ValidateNested({ each: true })
  @Type(() => InventoryIndexFilterRequest)
  filters?: InventoryIndexFilterRequest
}
