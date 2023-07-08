import { EntVariant } from './variant.entity'
import { IVariant } from './variant.interface'

export class VariantResponse extends EntVariant {
  productId: string
  supplierId: string

  static dto(data: IVariant): VariantResponse {
    const res = new VariantResponse()
    Object.assign(res, data)

    res.productId = data.product?.id

    return res
  }

  static dtos(data: IVariant[]): VariantResponse[] {
    return data.map((data) => this.dto(data))
  }
}
