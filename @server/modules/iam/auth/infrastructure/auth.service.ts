import { Injectable } from '@nestjs/common'
import { MailService } from '@server/modules/support/mail/infrastructure/mail.service'
import { IUser } from '../../user/infrastructure/user.interface'
import { MailTemplatePasswordResetLink } from '../templates/password-reset-link.template'
import { MailTemplatePasswordResetSuccess } from '../templates/password-reset-succes.template'

@Injectable()
export class AuthService {
  constructor(private readonly mailService: MailService) {}

  async passwordResetLink(user: IUser, link: string): Promise<boolean> {
    this.mailService.send({
      to: user.email,
      subject: `Password Reset ${user.name} Link`,
      html: MailTemplatePasswordResetLink(user, link),
    })

    return true
  }

  async passwordResetSuccess(user: IUser): Promise<boolean> {
    this.mailService.send({
      to: user.email,
      subject: `Password Reset ${user.name} Success`,
      html: MailTemplatePasswordResetSuccess(user),
    })

    return true
  }
}
