import {
  PushNotificationReadManyRequest,
  PushNotificationReadOneRequest,
} from '@server/modules/notification/push-notification/v1/read/push-notification-read.request'
import { IApiRes } from '../../../../../@server/infrastructure/interfaces/api-responses.interface'
import { PushNotificationResponse } from '../../../../../@server/modules/notification/push-notification/infrastructure/push-notification.response'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

export class PushNotificationReadAction {
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
