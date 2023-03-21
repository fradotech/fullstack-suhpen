import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { IsMatch } from '../../../../infrastructure/swagger/decorators/is-match.decorator'
import { UserRequest } from '../../user/infrastructure/user.request'

export class AuthRegisterRequest extends PickType(UserRequest, [
  'name',
  'email',
  'password',
  'passwordConfirmation',
]) {
  @IsMatch('password')
  passwordConfirmation!: string
}

export class AuthLoginRequest extends PickType(UserRequest, ['email']) {
  @IsNotEmpty()
  @ApiProperty({ example: 'Admin123' })
  password!: string
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
