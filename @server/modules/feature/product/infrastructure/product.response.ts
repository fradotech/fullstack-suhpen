import { EntProduct } from './product.entity'
import { IProduct } from './product.interface'

export class ProductResponse extends EntProduct {
  categoryIds: string[]

  static fromEntity(data: IProduct): ProductResponse {
    const res = new ProductResponse()
    Object.assign(res, data)

    res.categoryIds = data.categories?.map((data) => data.id)

    return res
  }

  static fromEntities(data: IProduct[]): ProductResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
