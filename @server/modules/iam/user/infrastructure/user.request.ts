import { ApiProperty, OmitType } from '@nestjs/swagger'
import { RoleEnum } from '@server/modules/iam/role/common/role.enum'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'
import dayjs from 'dayjs'
import { REGEX_PASSWORD } from '../common/character.constant'
import { IUser } from '../infrastructure/user.interface'

export class UserRequest implements IUser {
  id: string

  @ApiProperty({ example: 'Frado' })
  name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'Admin@admin.com' })
  email: string

  @IsNotEmpty()
  @MinLength(6)
  @Matches(REGEX_PASSWORD, {
    message:
      'password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  password: string

  @IsNotEmpty()
  @MinLength(6)
  @Matches(REGEX_PASSWORD, {
    message:
      'password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  passwordConfirmation: string

  @IsOptional()
  @IsEnum(RoleEnum)
  @ApiProperty({ example: RoleEnum.User })
  role: RoleEnum

  @IsOptional()
  @IsEnum(UserGenderEnum)
  @ApiProperty({ example: UserGenderEnum.Man })
  gender?: UserGenderEnum

  @IsOptional()
  @IsPhoneNumber('ID')
  @ApiProperty({ example: '085704816007' })
  phoneNumber?: string

  @ApiProperty()
  address?: string

  @ApiProperty({ example: new Date() })
  birthDate?: Date | dayjs.Dayjs

  @ApiProperty()
  avatar?: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  otp: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string

  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  isVerified: boolean
}

export class UserCreateRequest extends OmitType(UserRequest, [
  'passwordConfirmation',
  'role',
  'otp',
  'isVerified',
  'token',
]) {}

export class UserUpdateRequest extends OmitType(UserRequest, [
  'email',
  'password',
  'passwordConfirmation',
  'role',
  'otp',
  'isVerified',
  'token',
]) {}
