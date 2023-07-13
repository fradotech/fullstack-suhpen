import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import dayjs from 'dayjs'
import { IProduct } from '../../product/infrastructure/product.interface'
import { VariantSupplyTypeEnum } from '../common/variant.enum'
import { EntVariant } from './variant.entity'
import { IVariant } from './variant.interface'

export class VariantRequest extends EntVariant implements IVariant {
  id: string
  marginPrice: number

  @IsNotEmpty()
  @ApiProperty()
  productId: string
  product: IProduct

  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsEnum(VariantSupplyTypeEnum)
  @ApiProperty({ example: VariantSupplyTypeEnum.SelfStock })
  supplyType: VariantSupplyTypeEnum

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
  expiredDate?: Date | dayjs.Dayjs

  @ApiProperty({ example: false })
  isActive: boolean

  @ApiProperty()
  thumbnail?: string
}

export class VariantCreateRequest extends PartialType(VariantRequest) {
  static dto(data: VariantCreateRequest): IVariant {
    return Object.assign(new EntVariant(), data)
  }

  static dtos(data: VariantCreateRequest[]): IVariant[] {
    return data.map((data) => this.dto(data))
  }
}

export class VariantUpdateRequest extends PartialType(VariantRequest) {
  static dto(data: IVariant, req: VariantUpdateRequest): IVariant {
    return Object.assign(data, req)
  }
}
