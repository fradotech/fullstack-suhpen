import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { RegionProvince } from '../../province/infrastructure/province.entity'
import { IProvince } from '../../province/infrastructure/province.interface'
import { ICity } from './city.interface'

@Entity()
export class RegionCity extends BaseEntity implements ICity {
  @Column()
  name: string

  @Column()
  oid: number

  @ManyToOne(() => RegionProvince)
  province: IProvince
}
