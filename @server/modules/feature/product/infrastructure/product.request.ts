import { ApiProperty, PartialType } from '@nestjs/swagger'
import { BaseMasterDataRequest } from '@server/infrastructure/base/product/base-master-data.request'
import { IsOptional, IsString } from 'class-validator'
import { ICategory } from '../../category/infrastructure/category.interface'
import { IProduct } from './product.interface'

export class ProductRequest extends BaseMasterDataRequest implements IProduct {
  childs?: IProduct[]

  @IsOptional()
  @IsString()
  @ApiProperty()
  upc?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  categories?: ICategory[]

  @IsOptional()
  @IsString()
  @ApiProperty()
  brand?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  rating?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  parentId?: string
  parent?: IProduct
}

export class ProductCreateRequest extends PartialType(ProductRequest) {}

export class ProductUpdateRequest extends PartialType(ProductRequest) {}
