import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { RegionCity } from '../../city/infrastructure/city.entity'
import { ICity } from '../../city/infrastructure/city.interface'
import { IDistrict } from './district.interface'

@Entity()
export class RegionDistrict extends BaseEntity implements IDistrict {
  @Index()
  @Column()
  name: string

  @Index()
  @Column()
  oid: number

  @ManyToOne(() => RegionCity)
  city: ICity
}
