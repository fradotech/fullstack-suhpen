import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntProduct } from '../infrastructure/product.entity'
import { IProduct } from './product.interface'

class ProductRepo extends Repository<EntProduct> {
  constructor(
    @InjectRepository(EntProduct)
    private readonly productRepo: Repository<EntProduct>,
  ) {
    super(productRepo.target, productRepo.manager, productRepo.queryRunner)
  }
}

@Injectable()
export class ProductService extends ProductRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<IProduct[]> {
    return await this.findBy({ id: In(ids) })
  }
}
