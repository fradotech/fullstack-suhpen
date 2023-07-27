import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { config } from '@server/config'
import * as bcrypt from 'bcrypt'
import { Exception } from '../../../../common/exceptions/index.exception'
import { RoleDefaultKeyEnum } from '../../role/common/role.enum'
import { RoleService } from '../../role/infrastructure/role.service'
import { EntUser } from '../../user/infrastructure/user.entity'
import { IUser } from '../../user/infrastructure/user.interface'
import { UserService } from '../../user/infrastructure/user.service'
import { authMessages } from '../common/auth.message'
import { AuthNotificationService } from '../infrastructure/auth-notification.service'
import { AuthService } from '../infrastructure/auth.service'
import {
  AuthLoginRequest,
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
  AuthRegisterRequest,
} from './auth.request'

@Injectable()
export class AuthApp {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly authNotificationService: AuthNotificationService,
  ) {}

  async register(req: AuthRegisterRequest): Promise<IUser> {
    const roleCustomer = await this.roleService.findOneByOrFail({
      key: RoleDefaultKeyEnum.Customer,
    })

    const userCreate = AuthRegisterRequest.dto(req, roleCustomer)
    const user = await this.userService.save(userCreate)

    this.authNotificationService.sendRegister(user)

    const userLogin = AuthLoginRequest.dto(req)
    return await this.login(userLogin)
  }

  async login(req: AuthLoginRequest): Promise<IUser> {
    const { email, password } = req
    const user = await this.userService.findOneByEmailRelationRoles(email)
    await this.authService.validateLogin(user, password)
    user && (user.token = await this.jwtService.signAsync({ id: user?.id }))

    return user || new EntUser()
  }

  async passwordSendLink(req: AuthPasswordSendRequest): Promise<string> {
    const { email } = req
    const user = await this.userService.findOneBy({ email })
    if (!user) return 'Failed'

    user.token = await this.jwtService.signAsync({ id: user.id })
    const link = `${config.server.hostClient}/auth/password?token=${user.token}`

    await Promise.all([
      this.userService.update(user.id, user),
      this.authService.passwordResetLink(user, link),
    ])

    return link
  }

  async passwordGetLink(token: string): Promise<IUser | string> {
    const user = await this.userService.findOneBy({ token })
    if (!user) return authMessages.tokenInvalid
    return user
  }

  async passwordChange(
    req: AuthPasswordChangeRequest,
  ): Promise<IUser | string> {
    const { token } = req
    const user = await this.userService.findOneBy({ token })
    if (!user) return authMessages.tokenInvalid

    user.token != req.token &&
      Exception.unprocessable(authMessages.tokenInvalid)
    user.password = await bcrypt.hash(req.password, 10)
    user.token = undefined

    await Promise.all([
      this.userService.update(user.id, user),
      this.authService.passwordResetSuccess(user),
    ])

    return user
  }
}
