import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { In, Repository } from 'typeorm'
import { EntNotificationPush } from './notification-push.entity'
class NotificationPushRepo extends Repository<EntNotificationPush> {
  constructor(
    @InjectRepository(EntNotificationPush)
    private readonly repo: Repository<EntNotificationPush>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<EntNotificationPush[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findByInIdsWithUserRead(ids: string[]): Promise<EntNotificationPush[]> {
    return await this.find({ where: { id: In(ids) }, relations: ['users'] })
  }

  async findOneWithCategory(id: string): Promise<EntNotificationPush> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class NotificationPushService extends NotificationPushRepo {
  async updateReadAtNow(
    ids: string[],
    user?: IUser,
  ): Promise<EntNotificationPush[]> {
    const data = await this.findByInIdsWithUserRead(ids)

    data.forEach((data) => {
      if (!data.isBroadcast) data.readAt = new Date()
      else if (user) data.users.push(user)
    })

    return await this.save(data)
  }
}
