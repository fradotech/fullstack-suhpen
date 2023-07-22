import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { EntNotificationCategory } from './notification-category.entity'

class NotificationCategoryRepo extends Repository<EntNotificationCategory> {
  constructor(
    @InjectRepository(EntNotificationCategory)
    private readonly notificationCategoryRepo: Repository<EntNotificationCategory>,
  ) {
    super(
      notificationCategoryRepo.target,
      notificationCategoryRepo.manager,
      notificationCategoryRepo.queryRunner,
    )
  }

  async findByInIds(ids: string[]): Promise<EntNotificationCategory[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class NotificationCategoryService extends NotificationCategoryRepo {}
