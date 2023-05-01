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

  async create(req: IProduct): Promise<IProduct> {
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
    return (await this.findNoRelation(req.id)) as IProduct
  }

  async remove(id: string): Promise<IProduct> {
    const data = (await this.findNoRelation(id)) as IProduct
    return await this.productRepo.remove(data)
  }

  async softRemove(id: string): Promise<IProduct> {
    const data = (await this.findNoRelation(id)) as IProduct
    return await this.productRepo.softRemove(data)
  }

  async findNoRelation(id: string): Promise<IProduct> {
    return await this.productRepo.findOneOrFail({ where: { id } })
  }

  // --- Another findOneBy() --- \\
}
