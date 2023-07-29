import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import * as bcrypt from 'bcrypt'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  Matches,
  MinLength,
} from 'class-validator'
import dayjs from 'dayjs'
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { EntRole } from '../../role/infrastructure/role.entity'
import { IRole } from '../../role/infrastructure/role.interface'
import { REGEX_PASSWORD } from '../common/character.constant'
import { IUser } from '../infrastructure/user.interface'

@Entity()
export class EntUser extends BaseEntity implements IUser {
  @ApiProperty({ example: 'Frado' })
  @Column()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  @Column({ unique: true })
  email: string

  @IsNotEmpty()
  @MinLength(6)
  @Matches(REGEX_PASSWORD, {
    message:
      'password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  @Column({ type: 'varchar' })
  password: string | undefined

  @ManyToMany(() => EntRole)
  @JoinTable({ name: 'ent_user_roles' })
  roles: IRole[]

  @IsOptional()
  @IsEnum(UserGenderEnum)
  @ApiProperty({ example: UserGenderEnum.Male })
  @Column({ default: null })
  gender?: UserGenderEnum

  @IsOptional()
  @IsPhoneNumber('ID')
  @ApiProperty({ example: '085704816007' })
  @Column({ default: null })
  phoneNumber?: string

  @ApiProperty()
  @Column({ default: null })
  address?: string

  @ApiProperty({ example: new Date() })
  @Column({ default: null, type: 'timestamp' })
  birthDate?: Date | dayjs.Dayjs

  @ApiProperty()
  @Column({ default: null })
  avatar?: string

  @IsNumber()
  @ApiProperty()
  @Column({ default: null })
  otp?: number

  @Column({ default: false })
  isVerified?: boolean

  @ApiProperty()
  @Column({ default: null })
  token?: string

  @BeforeInsert()
  async hashPassword?() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
