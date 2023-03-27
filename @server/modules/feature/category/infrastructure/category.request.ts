import { ApiProperty, PartialType } from '@nestjs/swagger'
import { BaseMasterDataRequest } from '@server/infrastructure/base/product/base-master-data.request'
import { IsNotEmpty, IsString } from 'class-validator'

export class CategoryRequest extends BaseMasterDataRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '#007fd0' })
  labelColor: string
}

export class CategoryCreateRequest extends PartialType(CategoryRequest) {}

export class CategoryUpdateRequest extends PartialType(CategoryRequest) {}
