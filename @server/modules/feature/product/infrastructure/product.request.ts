import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { IsArray, IsOptional, IsString } from 'class-validator'
import { ICategory } from '../../category/infrastructure/category.interface'
import { EntProduct } from './product.entity'
import { IProduct } from './product.interface'

export class ProductRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
  childs?: IProduct[]

  @ApiProperty()
  upc?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  categoryIds: string[]
  categories?: ICategory[]

  @ApiProperty()
  brand?: string

  @ApiProperty()
  rating?: string

  @ApiProperty()
  parentId?: string
  parent?: IProduct
}

export class ProductCreateRequest extends PartialType(ProductRequest) {
  static dto(data: ProductCreateRequest): IProduct {
    return Object.assign(new EntProduct(), data)
  }

  static dtos(data: ProductCreateRequest[]): IProduct[] {
    return data.map((data) => this.dto(data))
  }
}

export class ProductUpdateRequest extends PartialType(ProductRequest) {
  static dto(data: IProduct, req: ProductUpdateRequest): IProduct {
    return Object.assign(data, req)
  }
}
