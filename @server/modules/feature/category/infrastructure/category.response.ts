import { EntCategory } from './category.entity'
import { ICategory } from './category.interface'

export class CategoryResponse extends EntCategory {
  static dto(data: ICategory): CategoryResponse {
    const res = new CategoryResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: ICategory[]): CategoryResponse[] {
    return data.map((data) => this.dto(data))
  }
}
