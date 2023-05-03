import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import {
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IBaseEntity } from './base-entity.interface'

export class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => EntUser)
  createdBy: IUser

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => EntUser)
  updatedBy: IUser

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => EntUser)
  deletedBy: IUser
}
