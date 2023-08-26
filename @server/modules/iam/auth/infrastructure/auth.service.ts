import { Injectable } from '@nestjs/common'
import { Exception } from '@server/common/exceptions/index.exception'
import { MailService } from '@server/modules/notification/mail/infrastructure/mail.service'
import * as bcrypt from 'bcrypt'
import { IIamUser } from '../../user/infrastructure/user.interface'
import { authMessages } from '../common/auth.message'
import { MailTemplatePasswordResetLink } from '../templates/password-reset-link.template'
import { MailTemplatePasswordResetSuccess } from '../templates/password-reset-succes.template'

@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailService) {}

  async validateLogin(
    user: IIamUser | null,
    password: string,
  ): Promise<boolean> {
    !user && Exception.unauthorized(authMessages.wrongCredential)
    const isValid = await bcrypt.compare(password, user?.password || '')
    !isValid && Exception.unauthorized(authMessages.wrongCredential)
    !user && Exception.unauthorized()

    return true
  }

  async passwordResetLink(user: IIamUser, link: string): Promise<boolean> {
    this.mailService.send({
      to: user.email,
      subject: `Password Reset ${user.name} Link`,
      html: MailTemplatePasswordResetLink(user, link),
    })

    return true
  }

  async passwordResetSuccess(user: IIamUser): Promise<boolean> {
    this.mailService.send({
      to: user.email,
      subject: `Password Reset ${user.name} Success`,
      html: MailTemplatePasswordResetSuccess(user),
    })

    return true
  }
}
