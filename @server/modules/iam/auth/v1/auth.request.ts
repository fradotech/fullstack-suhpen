import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IsMatch } from '../../../../infrastructure/swagger/decorators/is-match.decorator'
import { IRole } from '../../role/infrastructure/role.interface'
import { EntUser } from '../../user/infrastructure/user.entity'
import { IUser } from '../../user/infrastructure/user.interface'
import { UserRequest } from '../../user/v1/user.request'

export class AuthRegisterRequest extends PickType(UserRequest, [
  'name',
  'email',
  'password',
  'passwordConfirmation',
]) {
  @IsMatch('password')
  passwordConfirmation!: string

  static dto(data: AuthRegisterRequest, roleCustomer: IRole): IUser {
    const res = new EntUser()

    res.name = data.name
    res.email = data.email
    res.password = data.password
    res.roles = [roleCustomer]

    return res
  }
}

export class AuthLoginRequest extends PickType(UserRequest, ['email']) {
  @IsNotEmpty()
  @ApiProperty({ example: 'Admin123' })
  password!: string

  static dto(data: AuthRegisterRequest) {
    const res = new AuthLoginRequest()

    res.email = data.email
    res.password = data.password

    return res
  }
}

export class AuthPasswordSendRequest extends PickType(UserRequest, ['email']) {}

export class AuthPasswordChangeRequest extends PickType(UserRequest, [
  'password',
  'passwordConfirmation',
  'token',
]) {
  @IsMatch('password')
  passwordConfirmation!: string
}
