import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

export class InventoryResponse extends EntInventory {
  productId: string
  supplierId: string

  static fromEntity(data: IInventory): InventoryResponse {
    const res = new InventoryResponse()
    Object.assign(res, data)

    res.productId = data.product?.id

    return res
  }

  static fromEntities(data: IInventory[]): InventoryResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
