import { RoleEnum } from '@server/modules/iam/role/common/role.enum'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import * as bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IUser } from '../infrastructure/user.interface'

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

  // --- Regular attributs --- \\

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: RoleEnum.User })
  role: RoleEnum

  @Column({ default: null })
  gender?: UserGenderEnum

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
  isVerified?: boolean

  @Column({ default: null })
  token?: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
