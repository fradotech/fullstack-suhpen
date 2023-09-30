import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { config } from '@server/config'
import { BaseIndexUsecase } from '@server/infrastructure/index/index.usecase'
import { RoleService } from '@server/modules/iam/role/infrastructure/role.service'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Modules } from '@server/modules/modules'
import { Request } from 'express'
import {
  IIndexUsecaseRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { NotificationPushIndexRequest } from './notification-push-index.request'
import { INotificationPush } from './notification-push.interface'
import { NotificationPushService } from './notification-push.service'

@Injectable()
export class NotificationPushIndexUsecase extends BaseIndexUsecase {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly notificationPushService: NotificationPushService,
  ) {
    super()
  }

  async fetch(
    req: NotificationPushIndexRequest,
    isNotFilterColumnUser?: boolean,
  ): Promise<IPaginateResponse<INotificationPush>> {
    const user = this.request.user as IUser
    const name = 'notificationPush'
    const columns = [
      'title',
      'message',
      'isBroadcast',
      'pushAt',
      'readAt',
      'createdAt',
    ]
    const relations: IIndexUsecaseRelation[] = [
      {
        name: 'user',
        columns: ['name'],
      },
      {
        name: 'category',
        columns: ['name'],
      },
    ]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.notificationPushService,
      this.request,
      isNotFilterColumnUser,
    )

    const isHasPermission = RoleService.validatePermission(
      user,
      this.request.method,
      config.app.prefix + '/' + Modules.NotificationPush,
    )

    const filterNotificationRead = () => {
      query.andWhere(
        '(user.id = :userId OR (user.id is null AND notificationPush.isBroadcast = true))',
        {
          userId: user.id,
        },
      )
    }

    if (!isHasPermission) filterNotificationRead()
    else if (isHasPermission && isNotFilterColumnUser) filterNotificationRead()

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
