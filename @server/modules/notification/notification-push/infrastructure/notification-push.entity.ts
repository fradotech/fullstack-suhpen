import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import { EntNotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { INotificationPush } from './notification-push.interface'

@Entity()
export class EntNotificationPush
  extends BaseEntity
  implements INotificationPush
{
  @ApiProperty({ example: 'Test Create Notification' })
  @Index()
  @Column()
  title: string

  @ApiProperty()
  @Column({ default: false })
  isBroadcast: boolean

  @ApiProperty()
  @Column({ default: null })
  thumbnail?: string

  @ManyToOne(() => EntNotificationCategory)
  category: INotificationCategory

  @ApiProperty({ example: 'Test create notification message' })
  @Column({ type: 'text' })
  message: string

  @Column({ default: null })
  readAt?: Date

  @ManyToOne(() => EntUser)
  user?: IUser

  @Index()
  @Column({ default: null })
  pushAt?: Date

  @ManyToMany(() => EntUser)
  @JoinTable({ name: 'ent_notification_read_users' })
  readUsers: IUser[]
}
