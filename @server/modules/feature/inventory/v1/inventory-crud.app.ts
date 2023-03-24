import { Injectable } from '@nestjs/common'
import { EntInventory } from '../infrastructure/inventory.entity'
import { IInventory } from '../infrastructure/inventory.interface'
import {
  InventoryCreateRequest,
  InventoryUpdateRequest,
} from '../infrastructure/inventory.request'
import { InventoryService } from '../infrastructure/inventory.service'

@Injectable()
export class InventoryCrudApp {
  constructor(private readonly inventoryService: InventoryService) {}

  async find(): Promise<IInventory[]> {
    return await this.inventoryService.find()
  }

  async create(req: InventoryCreateRequest): Promise<IInventory> {
    const data = new EntInventory()
    Object.assign(data, req)

    return await this.inventoryService.create(data)
  }

  async findOneOrFail(id: string): Promise<IInventory> {
    return await this.inventoryService.findOneOrFail(id)
  }

  async update(id: string, req: InventoryUpdateRequest): Promise<IInventory> {
    const data = await this.inventoryService.findOneOrFail(id)
    Object.assign(data, req)

    return await this.inventoryService.update(data)
  }

  async remove(id: string): Promise<IInventory> {
    const data = this.inventoryService.findOneOrFail(id)
    await this.inventoryService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<IInventory> {
    const data = this.inventoryService.findOneOrFail(id)
    await this.inventoryService.softRemove(id)
    return data
  }
}
