import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { EntCategory } from './category.entity'
import { ICategory } from './category.interface'

@Injectable()
export class CategoryService implements BaseService {
  constructor(
    @InjectRepository(EntCategory)
    private readonly categoryRepo: Repository<ICategory>,
  ) {}

  async create(req: ICategory): Promise<ICategory> {
    const data = this.categoryRepo.create(req)
    return await this.categoryRepo.save(data)
  }

  async find(): Promise<ICategory[]> {
    return await this.categoryRepo.find()
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
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<ICategory> {
    const data = (await this.findOneOrFail(id)) as EntCategory
    return await this.categoryRepo.remove(data)
  }

  async softRemove(id: string): Promise<ICategory> {
    const data = (await this.findOneOrFail(id)) as EntCategory
    return await this.categoryRepo.softRemove(data)
  }

  // --- Another findOneBy() Methods --- \\

  async findNoRelation(
    id: string | string[],
  ): Promise<ICategory | ICategory[]> {
    if (!Array.isArray(id)) {
      return await this.categoryRepo.findOneOrFail({ where: { id } })
    }

    return await this.categoryRepo
      .createQueryBuilder('category')
      .whereInIds(id)
      .getMany()
  }
}
