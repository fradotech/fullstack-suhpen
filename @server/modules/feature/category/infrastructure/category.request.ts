import { PartialType } from '@nestjs/swagger'
import { BaseMasterDataRequest } from '@server/infrastructure/base/product/base-master-data.request'

export class CategoryRequest extends BaseMasterDataRequest {}

export class CategoryCreateRequest extends PartialType(CategoryRequest) {}

export class CategoryUpdateRequest extends PartialType(CategoryRequest) {}
