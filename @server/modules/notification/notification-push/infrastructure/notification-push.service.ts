import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IIamUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { In, Repository } from 'typeorm'
import { NotificationPush } from './notification-push.entity'
class NotificationPushRepo extends Repository<NotificationPush> {
  constructor(
    @InjectRepository(NotificationPush)
    private readonly repo: Repository<NotificationPush>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<NotificationPush[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findByInIdsWithUserRead(ids: string[]): Promise<NotificationPush[]> {
    return await this.find({ where: { id: In(ids) }, relations: ['users'] })
  }

  async findOneWithCategory(id: string): Promise<NotificationPush> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class NotificationPushService extends NotificationPushRepo {
  async updateReadAtNow(
    ids: string[],
    user?: IIamUser,
  ): Promise<NotificationPush[]> {
    const data = await this.findByInIdsWithUserRead(ids)

    data.forEach((data) => {
      if (!data.isBroadcast) data.readAt = new Date()
      else if (user) data.users.push(user)
    })

    return await this.save(data)
  }
}
