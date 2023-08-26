import { ApiProperty, OmitType } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator'
import { RoleDefaultKeyEnum } from '../../role/common/role.enum'
import { REGEX_PASSWORD } from '../common/character.constant'
import { IamUser } from '../infrastructure/user.entity'
import { IIamUser } from '../infrastructure/user.interface'

export class UserRequest extends IamUser implements IIamUser {
  @IsNotEmpty()
  @MinLength(6)
  @Matches(REGEX_PASSWORD, {
    message:
      'password should contain number, under case, and upper case character',
  })
  @ApiProperty({ example: 'Admin123' })
  passwordConfirmation: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  roleIds?: string[]

  @IsNotEmpty()
  otp: number

  @IsNotEmpty()
  token: string
}

export class UserCreateRequest extends OmitType(UserRequest, [
  'id',
  'passwordConfirmation',
  'otp',
  'isVerified',
  'token',
]) {
  roleKey?: RoleDefaultKeyEnum

  static dto(data: UserCreateRequest): UserCreateRequest {
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
    res.roleKey = data.roleKey

    return res
  }

  static dtos(data: UserCreateRequest[]): UserCreateRequest[] {
    return data.map((data) => this.dto(data))
  }
}

export class UserUpdateRequest extends OmitType(UserRequest, [
  'id',
  'email',
  'password',
  'passwordConfirmation',
  'roles',
  'otp',
  'isVerified',
  'token',
]) {
  static dto(res: IIamUser, data: UserUpdateRequest): IIamUser {
    res.name = data.name
    res.gender = data.gender
    res.phoneNumber = data.phoneNumber
    res.avatar = data.avatar
    res.address = data.address
    res.birthDate = data.birthDate

    return res
  }
}
