import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { EntPushNotification } from './push-notification.entity'

class PushNotificationRepo extends Repository<EntPushNotification> {
  constructor(
    @InjectRepository(EntPushNotification)
    private readonly repo: Repository<EntPushNotification>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<EntPushNotification[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneWithCategory(id: string): Promise<EntPushNotification> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class PushNotificationService extends PushNotificationRepo {
  async updateReadAtNow(ids: string[]): Promise<EntPushNotification[]> {
    const data = await this.findByInIds(ids)
    data.forEach((item) => (item.readAt = new Date()))
    return await this.save(data)
  }
}
