import { Util } from '@server/common/utils/util'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { BeforeInsert, Column } from 'typeorm'
import { IBaseMasterData } from './base-master-data.interface'

export class EntBaseMasterData extends BaseEntity implements IBaseMasterData {
  @Column()
  name: string

  @Column({ unique: true })
  key: string

  @Column({ default: true })
  isActive: boolean

  @Column({ default: null, type: 'text' })
  description?: string

  @Column({ default: null })
  thumbnail?: string

  @BeforeInsert()
  beforeInsert(): void {
    this.key = this.key || Util.camelToSnake(this.name)
  }
}
