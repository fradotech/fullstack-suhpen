import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Column, Entity } from 'typeorm'
import { IPermission } from './permission.interface'

@Entity()
export class EntPermission extends EntBaseMasterData implements IPermission {
  @Column({ default: '#ffffff' })
  labelColor: string

  @Column()
  path: string

  @Column()
  method: string
}
