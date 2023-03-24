import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

@Injectable()
export class InventoryService implements BaseService {
  constructor(
    @InjectRepository(EntInventory)
    private readonly inventoryRepo: Repository<IInventory>,
  ) {}

  async create(req: IInventory): Promise<IInventory> {
    const data = this.inventoryRepo.create(req)
    return await this.inventoryRepo.save(data)
  }

  async find(): Promise<IInventory[]> {
    return await this.inventoryRepo.find()
  }

  async findOne(id: string): Promise<IInventory> {
    return await this.inventoryRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IInventory> {
    return await this.inventoryRepo.findOneOrFail({ where: { id } })
  }

  async update(req: IInventory): Promise<IInventory> {
    const data = this.inventoryRepo.create(req)
    await this.inventoryRepo.update(data.id, data)
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<IInventory> {
    const data = (await this.findOneOrFail(id)) as EntInventory
    return await this.inventoryRepo.remove(data)
  }

  async softRemove(id: string): Promise<IInventory> {
    const data = (await this.findOneOrFail(id)) as EntInventory
    return await this.inventoryRepo.softRemove(data)
  }
}
