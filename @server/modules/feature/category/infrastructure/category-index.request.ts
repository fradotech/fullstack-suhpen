import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

class CategoryIndexFilterRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Pulsa' })
  name?: string
}

export class CategoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => CategoryIndexFilterRequest)
  filters?: CategoryIndexFilterRequest
}
