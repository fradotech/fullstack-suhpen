import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { EntCategory } from './category.entity'
import { ICategory } from './category.interface'

export class CategoryRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
  @ApiProperty({ example: '#007fd0' })
  labelColor: string
}

export class CategoryCreateRequest extends PartialType(CategoryRequest) {
  static dto(data: CategoryCreateRequest): ICategory {
    return Object.assign(new EntCategory(), data)
  }
}

export class CategoryUpdateRequest extends PartialType(CategoryRequest) {
  static dto(data: ICategory, req: CategoryUpdateRequest): ICategory {
    return Object.assign(data, req)
  }
}
