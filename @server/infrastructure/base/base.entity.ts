import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IBaseEntity } from './base-entity.interface'

export abstract class BaseEntity implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt?: Date

  @Column({ type: 'uuid', default: null })
  createdById?: string

  @UpdateDateColumn()
  updatedAt?: Date

  @Column({ type: 'uuid', default: null })
  updatedById?: string

  @DeleteDateColumn()
  deletedAt?: Date

  @Column({ type: 'uuid', default: null })
  deletedById?: string
}
