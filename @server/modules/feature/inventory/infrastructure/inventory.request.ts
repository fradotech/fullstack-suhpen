import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { EInventorySupplyType } from 'client/Modules/Feature/Inventory/Inventory.enum'
import { IProduct } from '../../product/infrastructure/product.interface'
import { IInventory } from './inventory.interface'

export class InventoryRequest implements IInventory {
  id: string
  marginPrice: number

  @IsNotEmpty()
  @ApiProperty()
  productId: string
  product: IProduct

  @ApiProperty()
  variant?: string

  @IsNotEmpty()
  @IsEnum(EInventorySupplyType)
  @ApiProperty({ example: EInventorySupplyType.SelfStock })
  supplyType: EInventorySupplyType

  @ApiProperty()
  sku?: string

  @ApiProperty({ example: 100000 })
  buyPrice: number

  @ApiProperty({ example: 120000 })
  sellPrice: number

  @ApiProperty({ example: 10000 })
  stock: number

  @ApiProperty({ example: 10000 })
  stockMinimum: number

  @ApiProperty()
  discountPercentage?: number

  @ApiProperty()
  expiredDate?: Date

  @ApiProperty({ example: false })
  isActive: boolean

  @ApiProperty()
  thumbnail?: string
}

export class InventoryCreateRequest extends PartialType(InventoryRequest) {}

export class InventoryUpdateRequest extends PartialType(InventoryRequest) {}
