import { PartialType } from '@nestjs/swagger'
import { BaseProductRequest } from '@server/infrastructure/base/product/base-product.request'

export class CategoryRequest extends BaseProductRequest {}

export class CategoryCreateRequest extends PartialType(CategoryRequest) {}

export class CategoryUpdateRequest extends PartialType(CategoryRequest) {}
