import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IProduct } from '../../product/infrastructure/product.interface'
import { IInventory } from './inventory.interface'

export class InventoryRequest implements IInventory {
  id: string
  marginPrice: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productId: string
  product: IProduct

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productVariantName?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  sku?: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100000 })
  buyPrice: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 120000 })
  sellPrice: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10000 })
  stock: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10000 })
  stockMinimum: number

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  discountPercentage?: number

  @IsOptional()
  @IsDate()
  @ApiProperty()
  expiredDate?: Date

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false })
  isActive: boolean
}

export class InventoryCreateRequest extends PartialType(InventoryRequest) {}

export class InventoryUpdateRequest extends PartialType(InventoryRequest) {}
