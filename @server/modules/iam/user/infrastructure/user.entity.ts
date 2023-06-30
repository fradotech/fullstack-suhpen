import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import * as bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { EntRole } from '../../role/infrastructure/role.entity'
import { IRole } from '../../role/infrastructure/role.interface'
import { IUser } from '../infrastructure/user.interface'

@Entity()
export class EntUser extends BaseEntity implements IUser {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @ManyToMany(() => EntRole)
  @JoinTable({ name: 'ent_user_roles' })
  roles: IRole[]

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
  async hashPassword?() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
