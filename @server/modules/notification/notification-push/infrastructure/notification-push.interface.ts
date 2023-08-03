import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'

export interface INotificationPush extends IBaseEntity {
  title: string
  isBroadcast: boolean
  thumbnail?: string
  category: INotificationCategory
  message: string
  readAt?: Date
  user?: IUser
  pushAt?: Date
  readUsers?: IUser[]
}
