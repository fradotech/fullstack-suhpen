import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { EntVariant } from '@server/modules/inventory/variant/infrastructure/variant.entity'
import { IVariant } from '@server/modules/inventory/variant/infrastructure/variant.interface'
import { Repository } from 'typeorm'

@Injectable()
export class DashboardVariantApp {
  constructor(
    @InjectRepository(EntVariant)
    private readonly variantRepo: Repository<IVariant>,
  ) {}

  async aggregate(column: string): Promise<IAggreate | undefined> {
    return await this.variantRepo
      .createQueryBuilder('variant')
      .select(`SUM(variant.${column})`, 'sum')
      .addSelect(`AVG(variant.${column})`, 'avg')
      .addSelect(`MIN(variant.${column})`, 'min')
      .addSelect(`MAX(variant.${column})`, 'max')
      .addSelect(`COUNT(*)`, 'count')
      .getRawOne()
  }
}
