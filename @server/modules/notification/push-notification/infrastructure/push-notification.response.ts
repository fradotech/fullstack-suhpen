import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntPushNotification } from './push-notification.entity'
import { IPushNotification } from './push-notification.interface'

export class PushNotificationResponse extends EntPushNotification {
  categoryId: string

  static dto(
    data: IPushNotification,
    userLogged?: IUser,
  ): PushNotificationResponse {
    const res = new PushNotificationResponse()
    Object.assign(res, data)

    const readUsers =
      userLogged &&
      data.readUsers?.find((readUser) => {
        return readUser.id === userLogged.id
      })

    res.categoryId = data.category?.id
    res.readAt = data.readAt || (readUsers && new Date())

    return res
  }

  static dtos(
    data: IPushNotification[],
    userLogged?: IUser,
  ): PushNotificationResponse[] {
    return data.map((data) => this.dto(data, userLogged))
  }
}
