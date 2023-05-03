import * as bcrypt from 'bcrypt'
import { ERole } from 'client/Modules/Iam/Role/Role.enum'
import { EUserGender } from 'client/Modules/Iam/User/User.enum'
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

  @Column({ default: ERole.User })
  role: ERole

  @Column({ default: null })
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
