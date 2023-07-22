import { OmitType, PartialType } from '@nestjs/swagger'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { EntMessageCategory } from './message-category.entity'
import { IMessageCategory } from './message-category.interface'

export class MessageCategoryRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
}

export class MessageCategoryCreateRequest extends PartialType(
  MessageCategoryRequest,
) {
  static dto(data: MessageCategoryCreateRequest): IMessageCategory {
    return Object.assign(new EntMessageCategory(), data)
  }
}

export class MessageCategoryUpdateRequest extends PartialType(
  MessageCategoryRequest,
) {
  static dto(
    data: IMessageCategory,
    req: MessageCategoryUpdateRequest,
  ): IMessageCategory {
    return Object.assign(data, req)
  }
}

export class MessageCategorySyncRequest extends PartialType(
  MessageCategoryRequest,
) {
  static dto(data: MessageCategoryCreateRequest): IMessageCategory {
    const res = MessageCategoryCreateRequest.dto(data)
    return res
  }
}
