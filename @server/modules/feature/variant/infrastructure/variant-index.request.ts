import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { EntVariant } from './variant.entity'

class VariantIndexFilterRequest extends EntVariant {}

export class VariantIndexRequest extends IndexRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  productId?: string

  @ValidateNested({ each: true })
  @Type(() => VariantIndexFilterRequest)
  filters?: VariantIndexFilterRequest
}
