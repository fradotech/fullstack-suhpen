import { Injectable } from '@nestjs/common'
import { ProductService } from '../../product/infrastructure/product.service'
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
    const data = InventoryCreateRequest.dto(req)

    data.product = await this.productService.findOneByOrFail({
      id: req.productId,
    })

    return await this.inventoryService.save(data)
  }

  async findOneOrFail(id: string): Promise<IInventory> {
    return await this.inventoryService.findOneByOrFail({ id })
  }

  async update(id: string, req: InventoryUpdateRequest): Promise<IInventory> {
    const data = await this.inventoryService.findOneByOrFail({ id })
    const dataUpdate = InventoryUpdateRequest.dto(data, req)

    return await this.inventoryService.save(dataUpdate)
  }

  async delete(id: string): Promise<IInventory> {
    const data = await this.inventoryService.findOneByOrFail({ id })
    await this.inventoryService.delete(id)
    return data
  }
}
