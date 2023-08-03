import {
  NotificationPushReadManyRequest,
  NotificationPushReadOneRequest,
} from '@server/modules/notification/notification-push/v1/read/notification-push-read.request'
import { UseQueryResult, useQuery } from 'react-query'
import { IApiRes } from '../../../../../@server/infrastructure/interfaces/api-responses.interface'
import { NotificationPushResponse } from '../../../../../@server/modules/notification/notification-push/infrastructure/notification-push.response'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

export class NotificationPushReadAction {
  static useIndex(): UseQueryResult<IApiRes<NotificationPushResponse[]>> {
    const fetch = async () => await API.get(Path.notificationPush.read.index)
    return useQuery([Path.notificationPush.read.index], fetch)
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const res: IApiRes<NotificationPushResponse> = await API.get(
      Path.notificationPush.read.id(id),
    )

    return res
  }

  static async readOne(
    req: NotificationPushReadOneRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const res = await API.patch(Path.notificationPush.read.one, req)
    return res
  }

  static async readMany(
    req: NotificationPushReadManyRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const res = await API.patch(Path.notificationPush.read.many, req)
    return res
  }
}
