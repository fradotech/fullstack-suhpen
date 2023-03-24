import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

export class InventoryResponse extends EntInventory {
  static fromEntity(data: IInventory): InventoryResponse {
    const res = new InventoryResponse()
    Object.assign(res, data)

    return res
  }

  static fromEntities(data: IInventory[]): InventoryResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
