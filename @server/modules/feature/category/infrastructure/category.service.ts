import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntCategory } from './category.entity'
import { ICategory } from './category.interface'

@Injectable()
export class CategoryService implements BaseService {
  constructor(
    @InjectRepository(EntCategory)
    private readonly categoryRepo: Repository<ICategory>,
  ) {}

  async save(req: ICategory): Promise<ICategory> {
    const data = this.categoryRepo.create(req)
    return await this.categoryRepo.save(data)
  }

  async find(): Promise<ICategory[]> {
    return await this.categoryRepo.find()
  }

  async findByIds(ids: string[]): Promise<ICategory[]> {
    return await this.categoryRepo.findBy({ id: In(ids) })
  }

  async findOne(id: string): Promise<ICategory> {
    return await this.categoryRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<ICategory> {
    return await this.categoryRepo.findOneOrFail({ where: { id } })
  }

  async update(req: ICategory): Promise<ICategory> {
    const data = this.categoryRepo.create(req)
    await this.categoryRepo.update(data.id, data)
    return await this.findNoRelation(req.id)
  }

  async delete(id: string): Promise<ICategory> {
    const data = await this.findNoRelation(id)
    await this.categoryRepo.delete(id)
    return data
  }

  async softDelete(id: string): Promise<ICategory> {
    const data = await this.findNoRelation(id)
    await this.categoryRepo.softDelete(id)
    return data
  }

  async findNoRelation(id: string): Promise<ICategory> {
    return await this.categoryRepo.findOneOrFail({ where: { id } })
  }

  // --- Another findOneBy() --- \\
}
