import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Column, Entity, ManyToOne } from 'typeorm'
import { EntNotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { IPushNotification } from './push-notification.interface'

@Entity()
export class EntPushNotification
  extends BaseEntity
  implements IPushNotification
{
  @Column()
  title: string

  @Column({ default: false })
  isBroadcast: boolean

  @Column({ default: null })
  thumbnail?: string

  @ManyToOne(() => EntNotificationCategory)
  category: INotificationCategory

  @Column({ type: 'text' })
  message: string

  @Column({ default: null })
  readAt?: Date

  @ManyToOne(() => EntUser)
  user?: IUser

  @Column({ default: null })
  pushAt?: Date
}
