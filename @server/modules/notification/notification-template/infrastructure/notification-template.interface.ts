import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { KeyValueType } from '@server/infrastructure/interfaces/key-value.interface'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'

export interface INotificationTemplate extends IBaseEntity {
  title: string
  message: string
  variables: KeyValueType[]
  category: INotificationCategory
  thumbnail?: string
}
