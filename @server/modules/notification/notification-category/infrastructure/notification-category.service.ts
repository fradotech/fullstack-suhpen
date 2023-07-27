import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { EntNotificationCategory } from './notification-category.entity'

class NotificationCategoryRepo extends Repository<EntNotificationCategory> {
  constructor(
    @InjectRepository(EntNotificationCategory)
    private readonly repo: Repository<EntNotificationCategory>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<EntNotificationCategory[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class NotificationCategoryService extends NotificationCategoryRepo {}
