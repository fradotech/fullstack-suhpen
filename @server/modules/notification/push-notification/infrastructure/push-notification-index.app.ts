import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { config } from '@server/config'
import { RoleService } from '@server/modules/iam/role/infrastructure/role.service'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Modules } from '@server/modules/modules'
import { Request } from 'express'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { PushNotificationIndexRequest } from './push-notification-index.request'
import { IPushNotification } from './push-notification.interface'
import { PushNotificationService } from './push-notification.service'

@Injectable()
export class PushNotificationIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly pushNotificationService: PushNotificationService,
  ) {
    super()
  }

  async fetch(
    req: PushNotificationIndexRequest,
    isNotFilterColumnUser?: boolean,
  ): Promise<IPaginateResponse<IPushNotification>> {
    const user = this.request.user as IUser
    const name = 'pushNotifications'
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
        name: 'readUsers',
      },
    ]
    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.pushNotificationService,
      this.request,
      isNotFilterColumnUser,
    )

    const isHasPermission = RoleService.validatePermission(
      user,
      this.request.method,
      config.app.prefix + '/' + Modules.PushNotification,
    )

    const filterNotificationRead = () => {
      query.andWhere(
        '(user.id = :userId OR (user.id is null AND pushNotifications.isBroadcast = true))',
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
