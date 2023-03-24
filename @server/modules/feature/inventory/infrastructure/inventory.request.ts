import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IProduct } from '../../product/infrastructure/product.interface'
import { IInventory } from './inventory.interface'

export class InventoryRequest implements IInventory {
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productId: string
  product: IProduct

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
  discount?: number

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false })
  isActive: boolean
}

export class InventoryCreateRequest extends PartialType(InventoryRequest) {}

export class InventoryUpdateRequest extends PartialType(InventoryRequest) {}
