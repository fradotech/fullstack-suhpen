import { ApiProperty, OmitType } from '@nestjs/swagger'
import { ERole } from '@server/modules/iam/role/infrastructure/role.enum'
import {
  IsDate,
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
import { EUserGender } from './user.enum'

export class UserRequest implements IUser {
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Frado' })
  name: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'Admin@admin.com' })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(REGEX_PASSWORD, {
    message:
      'Password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  password: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(REGEX_PASSWORD, {
    message:
      'Password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  passwordConfirmation: string

  @IsOptional()
  @IsEnum(ERole)
  @ApiProperty({ example: ERole.User })
  role: ERole

  @IsOptional()
  @IsEnum(EUserGender)
  @ApiProperty({ example: EUserGender.Man })
  gender?: EUserGender

  @IsOptional()
  @IsString()
  @IsPhoneNumber('ID')
  @ApiProperty({ example: '085123456789' })
  phoneNumber?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string

  @IsOptional()
  @ApiProperty()
  birthDate?: Date | dayjs.Dayjs

  @IsOptional()
  @IsString()
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

  @IsOptional()
  @IsDate()
  @ApiProperty()
  startAt?: Date

  @IsOptional()
  @IsDate()
  @ApiProperty()
  endAt?: Date

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
