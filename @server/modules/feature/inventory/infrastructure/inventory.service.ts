import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

@Injectable()
export class InventoryService implements BaseService {
  constructor(
    @InjectRepository(EntInventory)
    private readonly inventoryRepo: Repository<IInventory>,
  ) {}

  async save(req: IInventory): Promise<IInventory> {
    const data = this.inventoryRepo.create(req)
    return await this.inventoryRepo.save(data)
  }

  async find(): Promise<IInventory[]> {
    return await this.inventoryRepo.find()
  }

  async findByIds(ids: string[]): Promise<IInventory[]> {
    return await this.inventoryRepo.findBy({ id: In(ids) })
  }

  async findOne(id: string): Promise<IInventory> {
    return await this.inventoryRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IInventory> {
    const res = await this.inventoryRepo.findOneOrFail({
      where: { id },
      relations: ['product'],
    })

    return res
  }

  async update(req: IInventory): Promise<IInventory> {
    const data = this.inventoryRepo.create(req)
    await this.inventoryRepo.update(data.id, data)
    return await this.findNoRelation(req.id)
  }

  async delete(id: string): Promise<IInventory> {
    const data = await this.findNoRelation(id)
    await this.inventoryRepo.delete(id)
    return data
  }

  async softDelete(id: string): Promise<IInventory> {
    const data = await this.findNoRelation(id)
    await this.inventoryRepo.softDelete(id)
    return data
  }

  async findNoRelation(id: string): Promise<IInventory> {
    return await this.inventoryRepo.findOneOrFail({ where: { id } })
  }

  // --- Another findOneBy() --- \\
}
