import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
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

export class UserIndexRequest extends IndexRequest {
  @IsOptional()
  @IsString()
  @IsEnum(ERole)
  @ApiProperty({ example: ERole.User })
  role?: string
}

export class UserRequest implements IUser {
  id: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z ]+$/)
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
  @IsString()
  @IsPhoneNumber('ID')
  @ApiProperty({ example: '085123456789' })
  phoneNumber?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  otp: number

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string

  @IsOptional()
  @ApiProperty()
  birthDate?: Date | dayjs.Dayjs

  @IsOptional()
  @IsDate()
  @ApiProperty()
  startAt?: Date

  @IsOptional()
  @IsDate()
  @ApiProperty()
  endAt?: Date

  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  role: ERole
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
