import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { EntNotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { INotificationCategory } from '../../notification-category/infrastructure/notification-category.interface'
import { INotificationTemplate } from './notification-template.interface'

@Entity()
export class EntNotificationTemplate
  extends BaseEntity
  implements INotificationTemplate
{
  @Index()
  @Column()
  title: string

  @Column({ type: 'text' })
  message: string

  @ManyToOne(() => EntNotificationCategory)
  category: INotificationCategory

  @Column({ default: null })
  thumbnail?: string
}
