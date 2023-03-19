import { ApiProperty, PartialType } from '@nestjs/swagger'
import { BaseProductRequest } from '@server/infrastructure/base/product/base-product.request'
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { ICategory } from '../../category/infrastructure/category.interface'
import { IProduct } from './product.interface'

export class ProductRequest extends BaseProductRequest implements IProduct {
  childs?: IProduct[]

  @IsOptional()
  @IsString()
  @ApiProperty()
  sku?: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 0 })
  stock: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100000 })
  price: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  categories?: ICategory[]

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountPercentage?: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  brand?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  rating?: string

  @IsOptional()
  @IsDate()
  @ApiProperty()
  expiredDate?: Date

  @IsOptional()
  @IsString()
  @ApiProperty()
  parentId?: string
  parent?: IProduct
}

export class ProductCreateRequest extends PartialType(ProductRequest) {}

export class ProductUpdateRequest extends PartialType(ProductRequest) {}
