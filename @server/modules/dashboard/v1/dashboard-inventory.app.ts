import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntInventory } from '@server/modules/feature/inventory/infrastructure/inventory.entity'
import { IInventory } from '@server/modules/feature/inventory/infrastructure/inventory.interface'
import { Repository } from 'typeorm'
import { IAggreate } from '../infrastructure/dashboard.interface'

@Injectable()
export class DashboardInventoryApp {
  constructor(
    @InjectRepository(EntInventory)
    private readonly inventoryRepo: Repository<IInventory>,
  ) {}

  async aggregate(column: string): Promise<IAggreate> {
    return await this.inventoryRepo
      .createQueryBuilder('inventory')
      .select(`SUM(inventory.${column})`, 'sum')
      .addSelect(`AVG(inventory.${column})`, 'avg')
      .addSelect(`MIN(inventory.${column})`, 'min')
      .addSelect(`MAX(inventory.${column})`, 'max')
      .addSelect(`COUNT(*)`, 'count')
      .getRawOne()
  }
}
