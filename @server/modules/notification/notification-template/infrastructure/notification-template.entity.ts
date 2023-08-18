import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { NotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { INotificationTemplate } from './notification-template.interface'

@Entity()
export class NotificationTemplate
  extends BaseEntity
  implements INotificationTemplate
{
  @ApiProperty()
  @Index()
  @Column()
  title: string

  @Column({ default: null, unique: true })
  key: string

  @ApiProperty()
  @Column({ type: 'text' })
  message: string

  @ManyToOne(() => NotificationCategory)
  category: INotificationCategory

  @ApiProperty()
  @Column({ default: null })
  thumbnail?: string
}
