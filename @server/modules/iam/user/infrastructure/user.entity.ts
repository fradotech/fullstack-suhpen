import * as bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ERole } from '../../role/infrastructure/role.enum'
import { IUser } from '../infrastructure/user.interface'
import { EUserGender } from './user.enum'

@Entity()
export class EntUser implements IUser {
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

  @BeforeInsert()
  beforeInsert(): void {
    // this.createdBy = user
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    // this.updatedBy = user
    this.updatedAt = new Date()
  }

  @BeforeSoftRemove()
  beforeSoftRemove(): void {
    // this.deletedBy = user
  }

  // <--- Regular attributs --->

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: ERole.User, type: 'enum', enum: ERole })
  role: ERole

  @Column({ default: null, type: 'enum', enum: EUserGender })
  gender?: EUserGender

  @Column({ default: null })
  phoneNumber?: string

  @Column({ default: null })
  address?: string

  @Column({ default: null, type: 'datetime' })
  birthDate?: Date | dayjs.Dayjs

  @Column({ default: null })
  avatar?: string

  @Column({ default: null })
  otp?: number

  @Column({ default: false })
  isVerified: boolean

  @Column({ default: null })
  token?: string

  @Column({ default: null })
  startAt?: Date

  @Column({ default: null })
  endAt?: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
