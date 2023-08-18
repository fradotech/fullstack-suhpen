import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Entity } from 'typeorm'
import { INotificationCategory } from './notification-category.interface'

@Entity()
export class NotificationCategory
  extends EntBaseMasterData
  implements INotificationCategory {}
