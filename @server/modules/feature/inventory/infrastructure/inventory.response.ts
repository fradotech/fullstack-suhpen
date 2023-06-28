import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

export class InventoryResponse extends EntInventory {
  productId: string
  supplierId: string

  static dto(data: IInventory): InventoryResponse {
    const res = new InventoryResponse()
    Object.assign(res, data)

    res.productId = data.product?.id

    return res
  }

  static dtos(data: IInventory[]): InventoryResponse[] {
    return data.map((data) => this.dto(data))
  }
}
