import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
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

  async findByInIdsWithUserRead(ids: string[]): Promise<EntPushNotification[]> {
    return await this.find({ where: { id: In(ids) }, relations: ['readUsers'] })
  }

  async findOneWithCategory(id: string): Promise<EntPushNotification> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class PushNotificationService extends PushNotificationRepo {
  async updateReadAtNow(
    ids: string[],
    user?: IUser,
  ): Promise<EntPushNotification[]> {
    const data = await this.findByInIdsWithUserRead(ids)

    data.forEach((data) => {
      if (!data.isBroadcast) data.readAt = new Date()
      else if (user) data.readUsers.push(user)
    })

    return await this.save(data)
  }
}
