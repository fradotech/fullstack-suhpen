import { ApiProperty, PartialType } from '@nestjs/swagger'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'

export class CategoryRequest extends BaseMasterDataRequest {
  @ApiProperty({ example: '#007fd0' })
  labelColor: string
}

export class CategoryCreateRequest extends PartialType(CategoryRequest) {}

export class CategoryUpdateRequest extends PartialType(CategoryRequest) {}
