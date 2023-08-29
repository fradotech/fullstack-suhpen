import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { IamUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import { NotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { INotificationPush } from './notification-push.interface'

@Entity()
export class NotificationPush extends BaseEntity implements INotificationPush {
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

  @ManyToOne(() => NotificationCategory)
  category: INotificationCategory

  @ApiProperty({ example: 'Test create notification message' })
  @Column({ type: 'text' })
  message: string

  @Column({ default: null })
  readAt?: Date

  @ManyToOne(() => IamUser)
  user?: IUser

  @Column({ default: null })
  pushAt?: Date

  @ManyToMany(() => IamUser)
  @JoinTable({ name: 'notification_push_users' })
  users: IamUser[]
}
