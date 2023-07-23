import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { EntPushNotification } from './push-notification.entity'

class PushNotificationRepo extends Repository<EntPushNotification> {
  constructor(
    @InjectRepository(EntPushNotification)
    private readonly pushNotificationRepo: Repository<EntPushNotification>,
  ) {
    super(
      pushNotificationRepo.target,
      pushNotificationRepo.manager,
      pushNotificationRepo.queryRunner,
    )
  }

  async findByInIds(ids: string[]): Promise<EntPushNotification[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneWithCategory(id: string): Promise<EntPushNotification> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class PushNotificationService extends PushNotificationRepo {}
