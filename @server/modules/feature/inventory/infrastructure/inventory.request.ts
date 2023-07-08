import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { IProduct } from '../../product/infrastructure/product.interface'
import { EInventorySupplyType } from '../common/inventory.enum'
import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

export class InventoryRequest extends EntInventory implements IInventory {
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

export class InventoryCreateRequest extends PartialType(InventoryRequest) {
  static dto(data: InventoryCreateRequest): IInventory {
    return Object.assign(new EntInventory(), data)
  }

  static dtos(data: InventoryCreateRequest[]): IInventory[] {
    return data.map((data) => this.dto(data))
  }
}

export class InventoryUpdateRequest extends PartialType(InventoryRequest) {
  static dto(data: IInventory, req: InventoryUpdateRequest): IInventory {
    return Object.assign(data, req)
  }
}
