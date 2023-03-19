import { EntCategory } from './category.entity'
import { ICategory } from './category.interface'

export class CategoryResponse extends EntCategory {
  static fromEntity(data: ICategory): CategoryResponse {
    const res = new CategoryResponse()
    Object.assign(res, data)

    return res
  }

  static fromEntities(data: ICategory[]): CategoryResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
