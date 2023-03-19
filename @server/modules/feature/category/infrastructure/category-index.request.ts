import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { IsEnum, IsOptional, ValidateNested } from 'class-validator'
import { ECategoryName } from './category.enum'

class CategoryIndexFilterRequest {
  @IsOptional()
  @IsEnum(ECategoryName, { each: true })
  @ApiProperty({ example: ECategoryName.Pulsa })
  name?: ECategoryName
}

export class CategoryIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => CategoryIndexFilterRequest)
  filters?: CategoryIndexFilterRequest
}
