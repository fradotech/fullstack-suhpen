import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'

export interface INotificationTemplate extends IBaseEntity {
  title: string
  message: string
  category: INotificationCategory
  thumbnail?: string
}
