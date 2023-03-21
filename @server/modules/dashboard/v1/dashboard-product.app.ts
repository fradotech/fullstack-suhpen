import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { Repository } from 'typeorm'
import { IAggreate } from '../infrastructure/dashboard.interface'

@Injectable()
export class DashboardProductApp {
  constructor(
    @InjectRepository(EntProduct)
    private readonly productRepo: Repository<IProduct>,
  ) {}

  async aggregate(column: string): Promise<IAggreate> {
    return await this.productRepo
      .createQueryBuilder('product')
      .select(`SUM(product.${column})`, 'sum')
      .addSelect(`AVG(product.${column})`, 'avg')
      .addSelect(`MIN(product.${column})`, 'min')
      .addSelect(`MAX(product.${column})`, 'max')
      .addSelect(`COUNT(*)`, 'count')
      .getRawOne()
  }
}
