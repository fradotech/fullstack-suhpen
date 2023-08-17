import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntNotificationPush } from './notification-push.entity'
import { INotificationPush } from './notification-push.interface'

export class NotificationPushResponse extends EntNotificationPush {
  categoryId: string

  static dto(
    data: INotificationPush,
    userLogged?: IUser,
  ): NotificationPushResponse {
    const res = new NotificationPushResponse()
    Object.assign(res, data)

    const users =
      userLogged &&
      data.users?.find((readUser) => {
        return readUser.id === userLogged.id
      })

    res.categoryId = data.category?.id
    res.readAt = data.readAt || (users && new Date())

    return res
  }

  static dtos(
    data: INotificationPush[],
    userLogged?: IUser,
  ): NotificationPushResponse[] {
    return data.map((data) => this.dto(data, userLogged))
  }
}
