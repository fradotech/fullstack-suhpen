import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { MailOptions } from 'nodemailer/lib/json-transport'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(mailOptions: MailOptions) {
    await this.mailerService.sendMail(mailOptions)
    Logger.log('Success send mail to ' + mailOptions.to, MailService.name)
  }
}
