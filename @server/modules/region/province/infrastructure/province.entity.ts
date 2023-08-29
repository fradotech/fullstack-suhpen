import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, Index } from 'typeorm'
import { IProvince } from './province.interface'

@Entity()
export class RegionProvince extends BaseEntity implements IProvince {
  @Index()
  @Column()
  name: string

  @Index()
  @Column()
  oid: number
}
