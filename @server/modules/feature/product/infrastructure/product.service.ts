import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { EntProduct } from './product.entity'
import { IProduct } from './product.interface'

@Injectable()
export class ProductService implements BaseService {
  constructor(
    @InjectRepository(EntProduct)
    private readonly productRepo: Repository<IProduct>,
  ) {}

  async save(req: IProduct): Promise<IProduct> {
    const data = this.productRepo.create(req)
    return await this.productRepo.save(data)
  }

  async find(): Promise<IProduct[]> {
    return await this.productRepo.find()
  }

  async findOne(id: string): Promise<IProduct> {
    return await this.productRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IProduct> {
    return await this.productRepo.findOneOrFail({
      where: { id },
      relations: ['categories'],
    })
  }

  async update(req: IProduct): Promise<IProduct> {
    const data = this.productRepo.create(req)
    await this.productRepo.update(data.id, data)
    return await this.findNoRelation(req.id)
  }

  async delete(id: string): Promise<IProduct> {
    const data = await this.findNoRelation(id)
    await this.productRepo.delete(id)
    return data
  }

  async softDelete(id: string): Promise<IProduct> {
    const data = await this.findNoRelation(id)
    await this.productRepo.softDelete(id)
    return data
  }

  async findNoRelation(id: string): Promise<IProduct> {
    return await this.productRepo.findOneOrFail({ where: { id } })
  }

  // --- Another findOneBy() --- \\
}
