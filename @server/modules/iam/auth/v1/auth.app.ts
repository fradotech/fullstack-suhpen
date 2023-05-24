import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { config } from '@server/config'
import * as bcrypt from 'bcrypt'
import { Exception } from '../../../../common/exceptions/index.exception'
import { EntUser } from '../../user/infrastructure/user.entity'
import { IUser } from '../../user/infrastructure/user.interface'
import { UserService } from '../../user/infrastructure/user.service'
import { authMessages } from '../common/auth.message'
import {
  AuthLoginRequest,
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
  AuthRegisterRequest,
} from '../infrastructure/auth.request'
import { AuthService } from '../infrastructure/auth.service'

@Injectable()
export class AuthApp {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authPasswordService: AuthService,
  ) {}

  async register(req: AuthRegisterRequest): Promise<IUser> {
    const user = new EntUser()
    Object.assign(user, req)

    return await this.userService.save(user)
  }

  async login(req: AuthLoginRequest): Promise<IUser> {
    const { email, password } = req
    const user = await this.userService.findOneByEmail(email)

    !user && Exception.unauthorized(authMessages.wrongCredential)
    const isValid = await bcrypt.compare(password, user?.password || '')
    !isValid && Exception.unauthorized(authMessages.wrongCredential)
    !user && Exception.unauthorized()

    user.token = await this.jwtService.signAsync({ id: user.id })

    return user
  }

  async passwordSendLink(req: AuthPasswordSendRequest): Promise<string> {
    const user = await this.userService.findOneByEmail(req.email)
    if (!user) return 'Failed'

    user.token = await this.jwtService.signAsync({ id: user.id })
    const link = `${config.server.hostClient}/auth/password?token=${user.token}`

    await this.userService.update(user)
    await this.authPasswordService.passwordResetLink(user, link)

    return link
  }

  async passwordGetLink(token: string): Promise<IUser | string> {
    const user = await this.userService.findOneByToken(token)
    if (!user) return authMessages.tokenInvalid
    return user
  }

  async passwordChange(
    req: AuthPasswordChangeRequest,
  ): Promise<IUser | string> {
    const user = await this.userService.findOneByToken(req.token)
    if (!user) return authMessages.tokenInvalid

    user.token != req.token &&
      Exception.unprocessable(authMessages.tokenInvalid)
    user.password = await bcrypt.hash(req.password, 10)
    user.token = null

    await this.userService.update(user)
    await this.authPasswordService.passwordResetSuccess(user)

    return user
  }
}
