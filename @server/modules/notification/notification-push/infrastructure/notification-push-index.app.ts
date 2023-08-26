import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { config } from '@server/config'
import { RoleService } from '@server/modules/iam/role/infrastructure/role.service'
import { IIamUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Modules } from '@server/modules/modules'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { NotificationPushIndexRequest } from './notification-push-index.request'
import { INotificationPush } from './notification-push.interface'
import { NotificationPushService } from './notification-push.service'

@Injectable()
export class NotificationPushIndexApp extends BaseIndexApp {
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
    const user = this.request.user as IIamUser
    const name = 'notificationPush'
    const columns = ['title', 'message', 'isBroadcast', 'createdAt']
    const relations: IIndexAppRelation[] = [
      {
        name: 'user',
        columns: ['name'],
      },
      {
        name: 'category',
        columns: ['name'],
      },
      {
        name: 'users',
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
