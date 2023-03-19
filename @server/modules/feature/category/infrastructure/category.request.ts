import { OmitType } from '@nestjs/swagger'
import { BaseProductRequest } from '@server/infrastructure/base/product/base-product.request'

class CategoryRequest extends BaseProductRequest {}

export class CategoryCreateRequest extends OmitType(CategoryRequest, []) {}

export class CategoryUpdateRequest extends OmitType(CategoryRequest, []) {}
