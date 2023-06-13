import { Logger } from '@nestjs/common'
import { config } from '@server/config'
import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { Exception } from '../../../../common/exceptions/index.exception'

export class MailService {
  constructor(private readonly transporter: nodemailer.Transporter) {
    this.transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: +config.mail.port,
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    })
  }

  send(mailOptions: MailOptions) {
    mailOptions.from = 'fradotech.id@gmail.com'
    this.transporter.sendMail(mailOptions, (error: Error, info: any) => {
      error && Exception.unprocessable(error)
      info &&
        Logger.log('Success send mail to ' + info.accepted, MailService.name)
    })
  }
}
