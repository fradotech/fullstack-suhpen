import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { IamUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IIamUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Repository } from 'typeorm'

@Injectable()
export class DashboardUserApp {
  constructor(
    @InjectRepository(IamUser)
    private readonly userRepo: Repository<IIamUser>,
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
