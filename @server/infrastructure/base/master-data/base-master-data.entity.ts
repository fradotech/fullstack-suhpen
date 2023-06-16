import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column } from 'typeorm'
import { IBaseMasterData } from './base-master-data.interface'

export abstract class EntBaseMasterData
  extends BaseEntity
  implements IBaseMasterData
{
  @Column()
  name: string

  @Column({ default: null, unique: true })
  key: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: null, type: 'text' })
  description?: string

  @Column({ default: null })
  thumbnail?: string
}
