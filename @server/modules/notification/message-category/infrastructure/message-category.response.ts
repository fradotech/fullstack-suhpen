import { EntMessageCategory } from './message-category.entity'
import { IMessageCategory } from './message-category.interface'

export class MessageCategoryResponse extends EntMessageCategory {
  permissionIds: string[]

  static dto(data: IMessageCategory): MessageCategoryResponse {
    const res = new MessageCategoryResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: IMessageCategory[]): MessageCategoryResponse[] {
    return data.map((data) => this.dto(data))
  }
}
