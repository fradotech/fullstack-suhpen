import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { NotificationCategory } from './notification-category.entity'

class NotificationCategoryRepo extends Repository<NotificationCategory> {
  constructor(
    @InjectRepository(NotificationCategory)
    private readonly repo: Repository<NotificationCategory>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<NotificationCategory[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class NotificationCategoryService extends NotificationCategoryRepo {}
