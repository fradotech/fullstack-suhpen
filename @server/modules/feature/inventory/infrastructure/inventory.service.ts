import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntInventory } from '../infrastructure/inventory.entity'

class InventoryRepo extends Repository<EntInventory> {
  constructor(
    @InjectRepository(EntInventory)
    private readonly inventoryRepo: Repository<EntInventory>,
  ) {
    super(
      inventoryRepo.target,
      inventoryRepo.manager,
      inventoryRepo.queryRunner,
    )
  }
}

@Injectable()
export class InventoryService extends InventoryRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntInventory[]> {
    return await this.findBy({ id: In(ids) })
  }
}
