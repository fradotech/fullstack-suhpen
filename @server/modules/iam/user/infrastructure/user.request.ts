import { ApiProperty, OmitType } from '@nestjs/swagger'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import {
  ArrayMinSize,
  IsArray,
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
import { EntUser } from './user.entity'

export class UserRequest extends EntUser implements IUser {
  id: string

  @ApiProperty({ example: 'Frado' })
  name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
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
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  roleIds?: string[]

  @IsOptional()
  @IsEnum(UserGenderEnum)
  @ApiProperty({ example: UserGenderEnum.Male })
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
  'otp',
  'isVerified',
  'token',
]) {
  static dto(data: UserCreateRequest): IUser {
    const res = new UserCreateRequest()

    res.name = data.name
    res.email = data.email
    res.password = data.password
    res.roles = data.roles
    res.gender = data.gender
    res.phoneNumber = data.phoneNumber
    res.address = data.address
    res.birthDate = data.birthDate
    res.avatar = data.avatar

    return res
  }

  static dtos(data: UserCreateRequest[]): IUser[] {
    return data.map((data) => this.dto(data))
  }
}

export class UserUpdateRequest extends OmitType(UserRequest, [
  'email',
  'password',
  'passwordConfirmation',
  'roles',
  'otp',
  'isVerified',
  'token',
]) {
  static dto(res: IUser, data: UserUpdateRequest): IUser {
    res.name = data.name
    res.gender = data.gender
    res.phoneNumber = data.phoneNumber
    res.avatar = data.avatar
    res.address = data.address
    res.birthDate = data.birthDate

    return res
  }
}
