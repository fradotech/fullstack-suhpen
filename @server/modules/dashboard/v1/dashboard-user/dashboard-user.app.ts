import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Repository } from 'typeorm'

@Injectable()
export class DashboardUserApp {
  constructor(
    @InjectRepository(EntUser)
    private readonly userRepo: Repository<IUser>,
  ) {}

  async aggregate(column: string): Promise<IAggreate | undefined> {
    return await this.userRepo
      .createQueryBuilder('user')
      .select(`SUM(user.${column})`, 'sum')
      .addSelect(`AVG(user.${column})`, 'avg')
      .addSelect(`MIN(user.${column})`, 'min')
      .addSelect(`MAX(user.${column})`, 'max')
      .addSelect(`COUNT(*)`, 'count')
      .getRawOne()
  }
}
