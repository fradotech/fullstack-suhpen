import {
  PushNotificationReadManyRequest,
  PushNotificationReadOneRequest,
} from '@server/modules/notification/push-notification/v1/read/push-notification-read.request'
import { UseQueryResult, useQuery } from 'react-query'
import { IApiRes } from '../../../../../@server/infrastructure/interfaces/api-responses.interface'
import { PushNotificationResponse } from '../../../../../@server/modules/notification/push-notification/infrastructure/push-notification.response'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

export class PushNotificationReadAction {
  static useIndex(): UseQueryResult<IApiRes<PushNotificationResponse[]>> {
    const fetch = async () => await API.get(Path.pushNotification.read.index)
    return useQuery([Path.pushNotification.read.index], fetch)
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const res: IApiRes<PushNotificationResponse> = await API.get(
      Path.pushNotification.read.id(id),
    )

    return res
  }

  static async readOne(
    req: PushNotificationReadOneRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const res = await API.patch(Path.pushNotification.read.one, req)
    return res
  }

  static async readMany(
    req: PushNotificationReadManyRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const res = await API.patch(Path.pushNotification.read.many, req)
    return res
  }
}
