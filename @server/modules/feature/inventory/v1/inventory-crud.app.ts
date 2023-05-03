import { Injectable } from '@nestjs/common'
import { ProductService } from '../../product/infrastructure/product.service'
import { EntInventory } from '../infrastructure/inventory.entity'
import { IInventory } from '../infrastructure/inventory.interface'
import {
  InventoryCreateRequest,
  InventoryUpdateRequest,
} from '../infrastructure/inventory.request'
import { InventoryService } from '../infrastructure/inventory.service'

@Injectable()
export class InventoryCrudApp {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly productService: ProductService,
  ) {}

  async find(): Promise<IInventory[]> {
    return await this.inventoryService.find()
  }

  async create(req: InventoryCreateRequest): Promise<IInventory> {
    const data = new EntInventory()
    Object.assign(data, req)

    data.product = await this.productService.findNoRelation(req.productId)

    return await this.inventoryService.create(data)
  }

  async findOneOrFail(id: string): Promise<IInventory> {
    return await this.inventoryService.findOneOrFail(id)
  }

  async update(id: string, req: InventoryUpdateRequest): Promise<IInventory> {
    const data = await this.inventoryService.findNoRelation(id)
    Object.assign(data, req)

    return await this.inventoryService.update(data)
  }

  async delete(id: string): Promise<IInventory> {
    const data = this.inventoryService.findNoRelation(id)
    await this.inventoryService.delete(id)
    return data
  }
}
