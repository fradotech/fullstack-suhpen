import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity } from 'typeorm'
import { IProvince } from './province.interface'

@Entity()
export class RegionProvince extends BaseEntity implements IProvince {
  @Column()
  name: string

  @Column()
  oid: number
}
